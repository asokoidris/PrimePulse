import {
    dataSource
} from '../config/database.js';


/**
 * @description Verification Service class
 */
class VerificationRegistryService {


    /**
     *@description function to create a new verification registry
     *@param {Object} data - req body object from the VerificationRegistryController
     *@return {Object} Returned object
     */
    static async createVerificationRegistry(data) {
        const {
            clientId,
            channel,
            otp
        } = data
        const verificationRegistryRepo = await dataSource.getRepository('verification_registry');
        const existingVerificationRegistry = await verificationRegistryRepo.findOne({
            where: [{
                clientId
            }, {
                channel
            }],
        });
        if (!existingVerificationRegistry) {
            const newVerificationRegistry = await verificationRegistryRepo.create({
                clientId,
                channel,
                otp,
                created: new Date(),
            });
            const result = await verificationRegistryRepo.save(newVerificationRegistry);
            return {
                statusCode: 200,
                message: 'Verification registry created successfully',
                data: result,
            };
        }
        // update the existing verification registry
        existingVerificationRegistry.otp = otp;
        existingVerificationRegistry.no_of_attempts = 0;
        existingVerificationRegistry.created = created;

        return {
            statusCode: 200,
            message: 'Verification registry updated successfully',
            data: existingVerificationRegistry,
        };
    }

    /**
     *@description function to get a validate verification registry
     *@param {Object} data - req body object from the VerificationRegistryController
     *@return {Object} Returned object
     */
    static async ValidateVerificationRegistry(data) {
        const {
            clientId,
            channel,
            otp
        } = data
        const verificationRegistryRepo = await dataSource.getRepository('verification_registry');
        const existingVerificationRegistry = await verificationRegistryRepo.findOne({
            where: [{
                clientId
            }, {
                channel
            }],
        });
        if (!existingVerificationRegistry)
            return {
                statusCode: 400,
                message: 'Verification registry not found',
            };



        // check if the otp is incorrect to update the no_of_attempts
        if (existingVerificationRegistry.otp !== otp) {

            if (existingVerificationRegistry.no_of_attempts > 3) {
                return {
                    statusCode: 400,
                    message: 'Number of attempts exceeded initiate a new verification registry',
                };
            }

            existingVerificationRegistry.no_of_attempts += 1;
            await existingVerificationRegistry.save();
            return {
                statusCode: 400,
                message: 'OTP is incorrect',
            };
        }

        return {
            statusCode: 200,
            message: 'Verification registry validated successfully',
            data: existingVerificationRegistry,
        };
    }

    /**
     * @description function to get a verify verification registry
     * @param {Object} data - req body object from the VerificationRegistryController
     * @return {Object} Returned object
     */
    static async verifyVerificationRegistry(data) {
        const { uniqueId, channel, otp } = data;
        const clientRepo = await dataSource.getRepository('client_master');
        const client = await clientRepo.findOne({
            where: [{
                email: uniqueId
            },
            {
                phone: uniqueId
            }],
        })

        if (!client)
            return {
                statusCode: 400,
                message: 'Client not found',
            };
        const validateOtp = await VerificationRegistryService.ValidateVerificationRegistry({
            clientId: client.id,
            channel,
            otp
        });
        if (validateOtp.statusCode === 400)
            return {
                statusCode: 400,
                message: validateOtp.message,
            };
        
        // update the client status to verified

        if (channel === 'email') {
            client.email_validation = true;
        }

        if (channel === 'phone') {
            client.phone_validation = true;
        }

        await client.save();
        
        return {
            statusCode: 200,
            message: 'Verification registry verified successfully',
            data: client,
        };

    }


}

export default VerificationRegistryService;