import jwt from 'jsonwebtoken';
import keys from '../../config/keys';
import UserModel from '../../models/user-model';
import randomstring from 'randomstring';

class UserToken {
  /**
   * @description function to generate a user access token
   * @param {Object} user - req body object from user service
   * @returns {Object} - Returned objects
   **/
  static async generateUserAccessSecretKey(user) {
    const payload = {
      id: user.id || user._id,
    };
    const options = {
      expiresIn: keys.jwt.expires,
    };
    const token = await jwt.sign(payload, keys.jwt.secret, options);
    return token;
  }

  /**
   * @description function to verify an user access token
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   */
  static async verifyUserAccessSecretKey(userToken) {
    try {
      const { id } = await jwt.verify(userToken, keys.jwt.secret);

      const user = await UserModel.findById(id);

      if (!user)
        return {
          statusCode: 404,
          message: 'Unauthorized',
        };

      return {
        statusCode: 200,
        message: 'Success',
        data: user,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: error.message,
      };
    }
  }
}

export default UserToken;
