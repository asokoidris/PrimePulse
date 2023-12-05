import { errorResponse, successResponse } from '../utils/response.js';
import { errorResponseMessage } from '../utils/constant/options.js';
import FavouriteItemService from '../services/favourite-item-service.js';

/**
 * @description Favourite Item Controller
 */
class FavouriteItemController {
  /**
   * @description Controller for creating a new favourite item
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async createFavouriteItemController(req, res) {
    const { body, user } = req;
    try {
      const newItem = await FavouriteItemService.createFavouriteItemService(
        user,
        body
      );
      logger.info(
        `createFavouriteItemController -> newItem: ${JSON.stringify(newItem)}`
      );
      return successResponse(
        res,
        newItem.statusCode,
        newItem.message,
        newItem.data
      );
    } catch (error) {
      logger.error(`createFavouriteItemController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for getting all favourite items by user
   *  @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getFavouriteItemsController(req, res) {
    const { user } = req;
    const { page = 1, limit = 20 } = req.query;
    try {
      const items = await FavouriteItemService.getAllFavouriteItemsService(
        user,
        { page, limit }
      );
      logger.info(
        `getAllFavouriteItemsService -> items: ${JSON.stringify(items)}`
      );
      return successResponse(res, items.statusCode, items.message, items.data);
    } catch (error) {
      logger.error(`getAllFavouriteItemsService -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for getting a favourite id details by user
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getFavouriteItemByIdController(req, res) {
    try {
      const { user, params } = req;
      const item = await FavouriteItemService.getFavouriteItemByIdService(
        user,
        params
      );
      if (!item) return errorResponse(res, 404, 'Item not found');

      logger.info(
        `getFavouriteItemByIdController -> item: ${JSON.stringify(item)}`
      );
      return successResponse(res, item.statusCode, item.message, item.data);
    } catch (error) {
      logger.error(`getAllFavouriteItemsService -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for deleting favourite items by user
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async deleteFavouriteItemController(req, res) {
    const { user, params } = req;
    try {
      const deletedItem = await FavouriteItemService.deleteFavouriteItemService(
        user,
        params
      );
      logger.info(
        `deleteFavouriteItemController -> deletedItem: ${JSON.stringify(
          deletedItem
        )}`
      );
      return successResponse(
        res,
        deletedItem.statusCode,
        deletedItem.message,
        deletedItem.data
      );
    } catch (error) {
      logger.error(`deleteFavouriteItemController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }
}
export default FavouriteItemController;
