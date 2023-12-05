import { errorResponse, successResponse } from '../utils/response.js';
import { errorResponseMessage } from '../utils/constant/options.js';
import CartService from '../services/cart-services.js';

/**
 * @description Cart Controller
 */

class CartController {
  /**
   * @description Controller for adding a product a cart
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async addToCartController(req, res) {
    const { user, body } = req;
    try {
      const cartItem = await CartService.addToCartService(user, body);
      logger.info(
        `addToCartController -> cartItem: ${JSON.stringify(cartItem)}`
      );
      return successResponse(
        res,
        cartItem.statusCode,
        cartItem.message,
        cartItem.data
      );
    } catch (error) {
      logger.error(`addToCartController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for viewing all carts
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getCartController(req, res) {
    const { user } = req;

    const { page = 1, limit = 20 } = req.query;
    try {
      const getItems = await CartService.getCartService(user, {
        page,
        limit,
      });
      logger.info(`getCartController -> getItems: ${JSON.stringify(getItems)}`);
      return successResponse(
        res,
        getItems.statusCode,
        getItems.message,
        getItems.data
      );
    } catch (error) {
      logger.error(`getCartController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for removing items from cart by user
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async removeCartItemController(req, res) {
    const { user, params } = req;
    try {
      const removeCart = await CartService.removeCartItemService(user, params);

      logger.info(
        `removeCartItemController -> removeCart: ${JSON.stringify(removeCart)}`
      );

      if (removeCart.statusCode !== 200) {
        return errorResponse(res, removeCart.statusCode, removeCart.message);
      }

      return successResponse(
        res,
        removeCart.statusCode,
        removeCart.message,
        removeCart.data
      );
    } catch (error) {
      logger.error(`removeCartItemController -> error: ${error.message}`);
    }
  }

  /**
   * @description Controller for removing items from cart by quantity
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async updateCartItemByQuantityController(req, res) {
    const { user, params } = req;
    try {
      const removeCart = await CartService.updateCartItemByQuantityService(
        user,
        params
      );

      logger.info(
        `removeCartItemByQuantityController -> removeCart: ${JSON.stringify(
          removeCart
        )}`
      );

      if (removeCart.statusCode === 404) {
        return errorResponse(res, 404, removeCart.message);
      }

      return successResponse(
        res,
        removeCart.statusCode,
        removeCart.message,
        removeCart.data
      );
    } catch (error) {
      logger.error(
        `removeCartItemByQuantityController -> error: ${error.message}`
      );
    }
  }
}

export default CartController;
