import secretTokenModel from '../models/secret-token-model.js';
import keys from '../config/keys.js';

/**
 * @description Secret Token Service class
 */
class SecretTokenService {
  /**
   * @description function to verify a user's token
   * @param {Object} user - the user object
   * @param {string} token - the token to verify
   * @return {Object} object containing the status of the verification
   */
  static async verifyToken(user, code, verificationType) {
    const { id } = user;

    const secretToken = await secretTokenModel.findOne({
      userId: id,
      verificationType,
    });

    if (!secretToken)
      return {
        statusCode: 404,
        message:
          'please request for a new token before trying again by initiating a forgot password request',
      };

    if (secretToken.expiryTime < new Date()) {
      await secretTokenModel.findOneAndDelete({
        userId: id,
        verificationType,
      });
      return {
        statusCode: 404,
        message: 'Token has expired, please request for a new code',
      };
    }

    if (secretToken.code !== code) {
      secretToken.trials += 1;
      await secretToken.save();
      if (secretToken.trials >= 3) {
        await secretTokenModel.findOneAndDelete({
          userId: id,
          verificationType,
        });
        return {
          statusCode: 404,
          message:
            'please request for a new token before trying again by initiating a forgot password request',
        };
      }

      return {
        statusCode: 404,
        message: 'Invalid token, Please make sure you entered the correct code',
      };
    }

    await secretTokenModel.findOneAndDelete({
      userId: id,
      verificationType,
    });

    logger.info(
      `verifyToken -> Token verified successfully for ${verificationType}`
    );

    return {
      statusCode: 200,
      message: 'Token verified successfully',
    };
  }

  /**
   * @description function to save token data generated to the database
   * @param {Object} user - user object from the AuthController
   * @param {Object} data - req body object from the AuthController
   * @param {string} verificationType - type of verification
   * @return {Object} Returned object
   */
  static async createSecretTokenDocument(user, code, verificationType) {
    const { id } = user;
    const secretToken = await secretTokenModel.findOne({
      userId: id,
      verificationType,
    });

    if (secretToken) {
      secretToken.code = code;
      secretToken.trials = 0;
      secretToken.expiryTime = keys.secretToken.expiry;
      await secretToken.save();

      logger.info(`createSecretTokenDocument -> Token updated successfully`);

      return {
        statusCode: 200,
        message: 'Token updated successfully',
        data: secretToken,
      };
    }

    const newSecretToken = new secretTokenModel({
      userId: id,
      code,
      verificationType,
    });
    await newSecretToken.save();

    logger.info(`createSecretTokenDocument -> Token created successfully`);

    return {
      statusCode: 201,
      message: 'Token created successfully',
      data: newSecretToken,
    };
  }
}

export default SecretTokenService;
