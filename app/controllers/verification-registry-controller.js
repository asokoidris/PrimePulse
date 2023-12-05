import { errorResponse, successResponse } from '../utils/response.js';
import VerificationRegistryService from '../services/verification-registry-service.js';

/**
 * @description User Controller
 */

class VerificationRegistryController {
  /**
   * @description return a JSON data
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async verifyVerificationRegistry(req, res) {
    try {
      const result =
        await VerificationRegistryService.verifyVerificationRegistry(req.body);
      logger.info(
        `Verify Verification Registry Controller: ${JSON.stringify(result)}`
      );
      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);
      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `Verify Verification Registry error: ${JSON.stringify(error.message)}`
      );
      return errorResponse(res, 500, `Oops! Something went wrong.`);
    }
  }
}

export default VerificationRegistryController;
