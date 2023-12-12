import { errorResponse, successResponse } from '../utils/response';
import { errorResponseMessage } from '../utils/constant/options';
import BankService from '../services/bank-service';

/**
 * @description Bank Controller
 */

class BankController {
  /**
   * @description create bank
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} The HTTP response object with the created bank data
   */
  static async createBankController(req, res) {
    const { user, body } = req;
    try {
      const result = await BankService.createBankService(user, body);

      logger.info(`createBankController -> result: ${JSON.stringify(result)}`);

      if (result.statusCode !== 201) {
        return errorResponse(res, result.statusCode, result.message);
      }

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`createBankController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description update bank
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} The HTTP response object with the updated bank data
   */
  static async updateBankController(req, res) {
    const { user, body, params } = req;
    try {
      const result = await BankService.updateBankService(user, params.id, body);

      logger.info(`updateBankController -> result: ${JSON.stringify(result)}`);

      if (result.statusCode !== 200) {
        return errorResponse(res, result.statusCode, result.message);
      }

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`updateBankController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description get all bank
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} The HTTP response object with the fetched bank data
   */
  static async getAllBankController(req, res) {
    const { user } = req;
    const { page = 1, limit = 20 } = req.query;
    try {
      const result = await BankService.getAllBankService(user, {
        page,
        limit,
      });

      logger.info(`getAllBankController -> result: ${JSON.stringify(result)}`);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`getAllBankController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description get bank by id
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} The HTTP response object with the fetched bank by Id
   */
  static async getBankByIdController(req, res) {
    const { user, params } = req;
    try {
      const result = await BankService.getBankByIdService(user, params.id);

      logger.info(`getBankByIdController -> result: ${JSON.stringify(result)}`);

      if (result.statusCode !== 200) {
        return errorResponse(res, result.statusCode, result.message);
      }

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`getBankByIdController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description delete bank by id
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} The HTTP response object with the deleted bank by Id
   */
  static async deleteBankController(req, res) {
    const { user, params } = req;
    try {
      const result = await BankService.deleteBankService(user, params.id);

      logger.info(`deleteBankController -> result: ${JSON.stringify(result)}`);

      if (result.statusCode !== 200) {
        return errorResponse(res, result.statusCode, result.message);
      }

      return successResponse(res, result.statusCode, result.message);
    } catch (error) {
      logger.error(`deleteBankController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }
}

export default BankController;
