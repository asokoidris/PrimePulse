import { errorResponse } from '../utils/response';
import UserToken from '../utils/jwt/user-token';
import AdminToken from '../utils/jwt/admin-token';
import { ADMIN_TYPES } from '../utils/constant/options';
import { USER_TYPES } from '../utils/constant/options';

/**
 * @description Authentication Controller class
 */
class AuthenticationMiddleware {
  /**
   * @description return a JSON data
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @param {Function} next - Next function
   * @return {Object} Returned object
   */
  static async isUserAuthenticated(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
      return errorResponse(
        res,
        401,
        'You are not authorized to access this route.'
      );
    }
    const verifyUserToken = await UserToken.verifyUserAccessSecretKey(token);

    if (verifyUserToken.statusCode === 404)
      return errorResponse(
        res,
        verifyUserToken.statusCode,
        'Access denied. Please login to continue.'
      );

    if (verifyUserToken.statusCode === 400)
      return errorResponse(
        res,
        verifyUserToken.statusCode,
        verifyUserToken.message
      );

    req.user = verifyUserToken.data;
    next();
  }

  /**
   * @description return a JSON data
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @param {Function} next - Next function
   * @return {Object} Returned object
   */
  static async isAdminAuthenticated(req, res, next) {
    const token = req.header('Authorization');

    if (!token)
      return errorResponse(
        res,
        401,
        'You are not authorized to access this route.'
      );
    const verifyAdminToken = await AdminToken.verifyAdminAccessSecretKey(token);

    if (verifyAdminToken.statusCode === 404)
      return errorResponse(
        res,
        verifyAdminToken.statusCode,
        'Unauthorized access. Please login to continue.'
      );

    if (verifyAdminToken.statusCode === 400)
      return errorResponse(
        res,
        verifyAdminToken.statusCode,
        verifyAdminToken.message
      );

    req.user = verifyAdminToken.data;
    next();
  }

  /**
   * @description return a JSON data
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @param {Function} next - Next function
   * @return {Object} Returned object
   */
  static async isSuperAdmin(req, res, next) {
    const { role } = req.user;

    const allowedRole = ADMIN_TYPES.SUPER_ADMIN;
    const roles = Array.isArray(role) ? role : [role];
    const isSuperAdmin = roles.includes(allowedRole);

    if (!isSuperAdmin)
      return errorResponse(
        res,
        403,
        'Access denied. You are not authorized to access this route, only super admin is allowed.'
      );

    next();
  }

  /**
   * @description return a JSON data to confirm if the performer is a Manufacturer
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @param {Function} next - Next function
   * @return {Object} Returned object
   */
  static async isManufacturer(req, res, next) {
    const { userType } = req.user;

    const allowedRole = USER_TYPES.MANUFACTURER;
    const roles = Array.isArray(userType) ? userType : [userType];
    const isManufacturer = roles.includes(allowedRole);

    if (!isManufacturer)
      return errorResponse(
        res,
        403,
        'Access denied. You are not authorized to access this route, only Manufacturer is allowed.'
      );

    next();
  }
}

export default AuthenticationMiddleware;
