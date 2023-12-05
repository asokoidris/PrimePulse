import { errorResponse, successResponse } from '../utils/response.js';
import AuthService from '../services/auth-service.js';
import { errorResponseMessage } from '../utils/constant/options.js';

/**
 * @description Authentication Controller
 */

class AuthController {
  /**
   * @description register a user controller
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async userRegistrationController(req, res) {
    try {
      const result = await AuthService.userRegistrationService(req.body);

      logger.info(
        `userRegistrationController -> result: ${JSON.stringify(result)}`
      );

      if (result.statusCode === 409)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `UserRegistrationController -> error: ${JSON.stringify(error.message)}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description login a user controller
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async userLoginController(req, res) {
    try {
      const result = await AuthService.userLoginService(req.body);
      logger.info(`userLoginController -> result: ${JSON.stringify(result)}`);
      if (result.statusCode === 409) {
        return errorResponse(res, 404, result.message);
      } else {
        return successResponse(
          res,
          result.statusCode,
          result.message,
          result.data,
          result.token
        );
      }
    } catch (error) {
      logger.error(`userLoginController -> error: ${JSON.stringify(error)}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description change password controller
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} - The response object
   */
  static async changePasswordController(req, res) {
    const { user } = req;
    try {
      const result = await AuthService.changePasswordService(user, req.body);
      logger.info(
        `changePasswordController -> result: ${JSON.stringify(result)}`
      );

      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(res, result.statusCode, result.message);
    } catch (error) {
      logger.error(
        `changePasswordController -> error: ${JSON.stringify(error)}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * Forget password
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} - The response object
   // FIXME - unnecessary line break
   */
  static async forgetPasswordController(req, res) {
    try {
      const result = await AuthService.forgotPasswordService(req.body);
      logger.info(
        `forgetPasswordController -> result: ${JSON.stringify(result)}`
      );
      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(res, result.statusCode, result.message);
    } catch (error) {
      logger.error(
        `forgetPasswordController -> error: ${JSON.stringify(error.message)}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * Reset password
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} - The response object
//FIXME - unnecessary line break
   */
  static async resetUserPasswordController(req, res) {
    try {
      const result = await AuthService.resetUserPasswordService(req.body);
      logger.info(
        `resetPasswordController -> result: ${JSON.stringify(result)}`
      );

      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(res, result.statusCode, result.message);
    } catch (error) {
      logger.error(
        `resetPasswordController -> error: ${JSON.stringify(error.message)}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description login an admin controller
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async adminLoginController(req, res) {
    try {
      const result = await AuthService.adminLoginService(req.body);
      logger.info(`adminLoginController -> result: ${JSON.stringify(result)}`);
      if (result.statusCode === 409)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data,
        result.token
      );
    } catch (error) {
      logger.error(`adminLoginController -> error: ${JSON.stringify(error)}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description onboard an admin controller // NOTE: this privilege is only for the super admin
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async onboardAdminController(req, res) {
    try {
      const result = await AuthService.onboardAdminService(req.body);
      logger.info(
        `onboardAdminController -> result: ${JSON.stringify(result)}`
      );
      if (result.statusCode === 409 || result.statusCode === 500)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `onboardAdminController -> error: ${JSON.stringify(error.message)}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }
}

export default AuthController;
