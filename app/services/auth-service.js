import UserModel from '../models/user-model.js';
import AdminModel from '../models/admin-model.js';
import bcrypt from 'bcrypt';
import UserToken from '../utils/jwt/user-token.js';
import AdminToken from '../utils/jwt/admin-token.js';
import SecretTokenService from './secret-token-service.js';
import HelperFunctions from '../utils/helper-functions.js';
import { VERIFICATION_TYPE, ADMIN_TYPES } from '../utils/constant/options.js';

/**
 * @description Auth Service class
 */
class AuthService {
  /**
   * @description function to sign-up or register a user
   * @param {Object} data - req body object from the AuthController
   * @return {Object} Returned object
   */
  static async userRegistrationService(data) {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      userType,
      agreeToTerm,
    } = data;

    //FIXME -  this function won't work if we have a user where either the email or phone number is null we need to fix this
    //NOTE - it best to write a static function in the user model that does this then call it here
    const userExist = await UserModel.findOne({
      $or: [{ email: email.toLowerCase() }, { phoneNumber }],
    });

    if (userExist)
      return {
        statusCode: 409,
        message: 'User already registered',
      };

    const user = await UserModel.create({
      firstName: HelperFunctions.capitalizeFirstLetter(firstName),
      lastName: HelperFunctions.capitalizeFirstLetter(lastName),
      phoneNumber,
      email: email.toLowerCase(),
      password: await HelperFunctions.hashPassword(password),
      userType,
      agreeToTerm,
    });

    user.password = undefined;

    logger.info(
      `userRegistrationService ->  User Created Successfully: ${JSON.stringify(
        user
      )}`
    );

    return {
      statusCode: 201,
      message: 'User Successfully Registered',
      data: user,
    };
  }

  /**
   * @description function to log in a user
   * @param {Object} data - req body object from the AuthController
   * @return {Object} Returned object
   */
  static async userLoginService(data) {
    const { email, password } = data;

    const user = await UserModel.findOne({ email });

    if (!user)
      return {
        statusCode: 401,
        message: 'Invalid Credentials',
      };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return {
        statusCode: 401,
        message: 'Invalid Credentials',
      };

    if (user) {
      const token = await UserToken.generateUserAccessSecretKey(user);
      logger.info(
        `userLoginService -> User Login Token created successfully: ${token}`
      );

      user.password = undefined;

      return {
        statusCode: 200,
        message: 'User Successfully Logged In',
        data: user,
        token,
      };
    }
  }

  /**
   * @description function to change a logged in user's password
   * @param {Object} data - req body object from the AuthController
   * @return {Object} Returned object
   */
  static async changePasswordService(user, data) {
    const { oldPassword, newPassword, confirmNewPassword } = data;
    const { id } = user;

    const findUser = await UserModel.findById(id);

    if (!findUser)
      return {
        statusCode: 400,
        message: 'Unable to change Password.',
      };

    const isOldPasswordValid = await HelperFunctions.comparePassword(
      oldPassword,
      findUser.password
    );

    if (!isOldPasswordValid)
      return {
        statusCode: 400,
        message: 'Old Password is incorrect.',
      };

    if (newPassword !== confirmNewPassword)
      return {
        statusCode: 400,
        message: "New password and confirm new password don't match",
      };

    const updateUserPassword = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        password: await HelperFunctions.hashPassword(newPassword),
      },
      {
        new: true,
      }
    );

    // check if password was changed
    if (!updateUserPassword)
      return {
        statusCode: 400,
        message: 'Unable to change Password.',
      };

    logger.info(`changePasswordService -> Password changed successfully`);

    return {
      statusCode: 200,
      message: 'Password changed successfully',
    };
  }

  /**
   * @description function to reset a user's forgotten password
   * @param {Object} data - req body object from the AuthController
   * @return {Object} Returned object
   */
  static async forgotPasswordService(data) {
    const { email, phoneNumber } = data;
    //FIXME - : this function won't work if we have a user where either the email or phone number is null we need to fix this
    const userExist = await UserModel.findOne({
      $or: [{ email: email.toLowerCase() }, { phoneNumber }],
    });

    if (!userExist)
      return {
        statusCode: 200,
        message:
          'If you have an account with us, you will receive an email with a 6 digit code  to reset your password',
      };

    const token = await HelperFunctions.generateRandomNumber(6);
    logger.info(
      `forgotPasswordService -> Generated Token: ${JSON.stringify(token)}`
    );

    const secretToken = await SecretTokenService.createSecretTokenDocument(
      userExist,
      token,
      VERIFICATION_TYPE.PASSWORD_RESET
    );
    logger.info(
      `forgotPasswordService -> Secret Token: ${JSON.stringify(secretToken)}`
    );

    if (
      (phoneNumber && secretToken.statusCode === 201) ||
      secretToken.statusCode === 200
    ) {
      // NOTE - uncomment this when we are ready to send sms to users don't forget to import the SmsService
      // const sms = await SmsService.sendSms(phoneNumber, token);
    }

    if (
      (email && secretToken.statusCode === 201) ||
      secretToken.statusCode === 200
    ) {
      //! NOTE - uncomment this when we are ready to send email to users don't forget to import the EmailService
      // const email = await EmailService.sendEmail(email, token);
    }

    //!SECTION - we need to collect the response from the sms and email service if either of them fails we need to return an error
    //!NOTE - only after the sms and email service has been successfully called do we return above response

    return {
      statusCode: 200,
      message: `If you have an account with us, you will receive an email with a 6 digit code to reset your password NOTE - test response: ${token}`,
    };
  }

  static async resetUserPasswordService(data) {
    const { newPassword, confirmNewPassword, email, phoneNumber, code } = data;

    if (newPassword !== confirmNewPassword) {
      return {
        statusCode: 400,
        message: 'New password and confirm password do not match',
      };
    }

    //!FIXME - : this function won't work if we have a user where either the email or phone number is null we need to fix this
    const user = await UserModel.findOne({ $or: [{ email }, { phoneNumber }] });

    if (!user) {
      return {
        statusCode: 400,
        message: 'User does not exist',
      };
    }

    const secretToken = await SecretTokenService.verifyToken(
      user,
      code,
      VERIFICATION_TYPE.PASSWORD_RESET
    );

    if (secretToken.statusCode === 404)
      return {
        statusCode: 404,
        message: secretToken.message,
      };

    // update the user's password
    user.password = await HelperFunctions.hashPassword(
      newPassword || confirmNewPassword
    );
    await user.save();

    logger.info(
      `resetUserPasswordService -> Password reset successfully ${secretToken}`
    );

    return {
      statusCode: 200,
      message: 'Password has been reset successfully',
    };
  }

  /**
   * @description function to login different admin types
   * @param {Object} data - req body object from the AuthController
   * @return {Object} Returned object
   */
  static async adminLoginService(data) {
    const { email, password } = data;

    const isSuperAdmin = HelperFunctions.isSuperAdmin(data);

    if (isSuperAdmin) {
      const token = await AdminToken.generateAdminAccessSecretKey(isSuperAdmin);

      logger.info(
        `adminLoginService -> Super Admin Login Token created successfully: ${token}`
      );

      return {
        statusCode: 200,
        message: 'Super Admin Successfully Logged In',
        data: isSuperAdmin,
        token,
      };
    }

    const isAdmin = await AdminModel.findOne({ email });

    if (!isSuperAdmin && !isAdmin)
      return {
        statusCode: 409,
        message: 'Invalid Credentials',
      };

    const isPasswordValid = await HelperFunctions.comparePassword(
      password,
      isAdmin.password
    );

    if (!isPasswordValid)
      return {
        statusCode: 409,
        message: 'Invalid Credentials',
      };

    const token = await AdminToken.generateAdminAccessSecretKey(isAdmin);

    logger.info(
      `adminLoginService -> Admin Login Token created successfully: ${token}`
    );

    isAdmin.password = undefined;

    return {
      statusCode: 200,
      message: 'Admin Successfully Logged In',
      data: isAdmin,
      token,
    };
  }

  /**
   * @description function to onboard a new admin by a super admin
   * @param {Object} data - req body object from the AuthController
   * @return {Object} Returned object
   */
  static async onboardAdminService(data) {
    const { firstName, lastName, email, phoneNumber, role, password } = data;

    const admin = await AdminModel.findOne({ email: email.toLowerCase() });

    if (admin)
      return {
        statusCode: 409,
        message: 'Admin already exists with this email',
      };

    // for the role we are expecting either an array of roles or a string
    // if it is a string we convert it to an array of one element or else we leave it as it is
    const roles = typeof role === 'string' ? [role] : role;

    const newAdmin = await AdminModel.create({
      firstName: HelperFunctions.capitalizeFirstLetter(firstName),
      lastName: HelperFunctions.capitalizeFirstLetter(lastName),
      email: email.toLowerCase(),
      phoneNumber,
      password: await HelperFunctions.hashPassword(password),
      createdBySuperAdmin: true,
      role: roles,
    });

    if (!newAdmin)
      return {
        statusCode: 500,
        message: 'Something went wrong, please try again',
      };

    logger.info(
      `onboardAdminService -> Admin created successfully: ${newAdmin}`
    );

    newAdmin.password = undefined;

    return {
      statusCode: 201,
      //NOTE: for the dynamic test if the role is admin we want to return Admin created successfully otherwise we want to return role Admin created successfully
      message: `${HelperFunctions.dynamicAdminResponseMessage(
        role,
        'created successfully'
      )}`,
      data: newAdmin,
    };
  }
}

export default AuthService;
