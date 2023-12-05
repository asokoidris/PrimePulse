import AddressService from '../services/address-service.js';
import { errorResponse, successResponse } from '../utils/response.js';
import { errorResponseMessage } from '../utils/constant/options.js';

/**
 * @description Address Controller
 */
class AddressController {
  /**
   * @description create address
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} The HTTP response object with the created address data
   */
  static async createAddressController(req, res) {
    const { user, body } = req;
    try {
      const result = await AddressService.createAddressService(user, body);

      logger.info(
        `createAddressController -> result: ${JSON.stringify(result)}`
      );

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
      logger.error(`createAddressController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description update address
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} The HTTP response object with the updated address data
   */
  static async updateAddressController(req, res) {
    const { user, body, params } = req;
    try {
      const result = await AddressService.updateAddressService(
        user,
        params.id,
        body
      );

      logger.info(
        `updateAddressController -> result: ${JSON.stringify(result)}`
      );

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
      logger.error(`updateAddressController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description get all address
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} The HTTP response object with all address data
   */
  static async getAllAddressController(req, res) {
    const { user } = req;

    const { page = 1, limit = 20 } = req.query;
    try {
      const result = await AddressService.getAllAddressService(user, {
        page,
        limit,
      });
      logger.info(
        `getAllAddressController -> result: ${JSON.stringify(result)}`
      );

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`getAllAddressController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description get address by id
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} The HTTP response object with the address data
   */
  static async getAddressByIdController(req, res) {
    const { user, params } = req;
    try {
      const result = await AddressService.getAddressByIdService(
        user,
        params.id
      );

      logger.info(
        `getAddressByIdController -> result: ${JSON.stringify(result)}`
      );

      if (result.statusCode !== 200)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`getAddressByIdController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }
  /**
   * @description delete address by id
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} The HTTP response object with the address data
   */
  static async deleteAddressController(req, res) {
    const { user, params } = req;
    try {
      const result = await AddressService.deleteAddressByIdService(
        user,
        params.id
      );

      logger.info(
        `deleteAddressController -> result: ${JSON.stringify(result)}`
      );

      if (result.statusCode !== 200)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`deleteAddressController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }
}

export default AddressController;
