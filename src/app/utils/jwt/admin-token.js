import jwt from 'jsonwebtoken';
import keys from '../../config/keys';
import HelperFunctions from '../helper-functions';
import AdminModel from '../../models/admin-model';

class AdminToken {
  /**
   * @description function to generate a admin access token
   * @param {Object} admin - req body object from admin service
   * @returns {Object} - Returned objects
   **/
  static async generateAdminAccessSecretKey(admin) {
    const payload = {
      id: admin._id || admin.id,
      email: admin.email,
      role: admin.role_id,
    };
    const options = {
      expiresIn: keys.jwt.expires,
    };
    const token = await jwt.sign(payload, keys.jwt.secret, options);
    return token;
  }

  /**
   * @description function to verify an admin access token
   * @param {string} adminAccessSecretToken - admin access token from request header
   * @returns {Object} - Returned objects
   */
  static async verifyAdminAccessSecretKey(adminAccessSecretToken) {
    try {
      const verifyToken = await jwt.verify(
        adminAccessSecretToken,
        keys.jwt.secret
      );

      const isSuperAdmin = HelperFunctions.isSuperAdmin(verifyToken);

      if (isSuperAdmin) {
        logger.info(
          `verifyAdminAccessSecretKey -> isSuperAdmin, ${JSON.stringify(
            isSuperAdmin
          )}`
        );
        return {
          statusCode: 200,
          message: 'Success',
          data: isSuperAdmin,
        };
      }

      const admin = await AdminModel.findById(verifyToken.id);

      if (!admin)
        return {
          statusCode: 404,
          message: 'Admin not found',
        };

      logger.info(
        `verifyAdminAccessSecretKey -> admin, ${JSON.stringify(admin)}`
      );

      return {
        statusCode: 200,
        message: 'Success',
        data: admin,
      };
    } catch (error) {
      logger.error(`verifyAdminAccessSecretKey -> error: ${error.message}`);
      return {
        statusCode: 400,
        message: error.message,
      };
    }
  }
}

export default AdminToken;
