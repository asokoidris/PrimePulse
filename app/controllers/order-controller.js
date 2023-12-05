import { errorResponse, successResponse } from '../utils/response.js';
import { errorResponseMessage } from '../utils/constant/options.js';
import OrderService from '../services/order-service.js';

/**
 * @description Order Controller
 */

class OrderController {
  /**
   * @description Controller for creating a new order
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   * @memberof OrderController
   */
  static async createOrderController(req, res) {
    const { body, user } = req;
    try {
      console.log('body', body);
      const newOrder = await OrderService.createOrderService(user, body);
      logger.info(
        `createOrderController -> newOrder: ${JSON.stringify(newOrder)}`
      );

      console.log('newOrder', newOrder);

      return successResponse(
        res,
        newOrder.statusCode,
        newOrder.message,
        newOrder.data
      );
    } catch (error) {
      logger.error(`createOrderController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for getting all orders
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   * @memberof OrderController
   */
  static async getAllOrdersController(req, res) {
    const { user } = req;
    // make default page 1 and limit 20
    const { page = 1, limit = 20 } = req.query;

    try {
      const orders = await OrderService.getAllOrdersService(user, {
        page,
        limit,
      });
      logger.info(
        `getAllOrdersController -> orders: ${JSON.stringify(orders)}`
      );
      return successResponse(
        res,
        orders.statusCode,
        orders.message,
        orders.data
      );
    } catch (error) {
      logger.error(`getAllOrdersController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for getting an order by id
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   * @memberof OrderController
   */
  static async getOrderByIdController(req, res) {
    const { user, params } = req;
    try {
      const order = await OrderService.deleteOrderByIdService(user, params);
      logger.info(`getOrderByIdController -> order: ${JSON.stringify(order)}`);
      return successResponse(res, order.statusCode, order.message, order.data);
    } catch (error) {
      logger.error(`getOrderByIdController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for deleting an order
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   * @memberof OrderController
   */
  static async deleteOrderController(req, res) {
    const { user, params } = req;
    try {
      const order = await OrderService.deleteOrderByIdService(user, params);
      logger.info(`deleteOrderController -> order: ${JSON.stringify(order)}`);
      return successResponse(res, order.statusCode, order.message, order.data);
    } catch (error) {
      logger.error(`deleteOrderController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for getting all orders for a manufacturer
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getAllManufacturerOrdersController(req, res) {
    const { user } = req;
    const { page = 1, limit = 20 } = req.query;
    try {
      const orders = await OrderService.getAllManufacturerOrdersService(user, {
        page,
        limit,
      });
      logger.info(
        `getAllManufacturerOrdersController -> orders: ${JSON.stringify(
          orders
        )}`
      );
      return successResponse(
        res,
        orders.statusCode,
        orders.message,
        orders.data
      );
    } catch (error) {
      logger.error(
        `getAllManufacturerOrdersController -> error: ${error.message}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for getting an order by id for a manufacturer
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getManufacturerOrderByIdController(req, res) {
    const { user, params } = req;
    try {
      const order = await OrderService.getManufacturerOrderByIdService(
        user,
        params
      );
      logger.info(
        `getManufacturerOrderByIdController -> order: ${JSON.stringify(order)}`
      );

      if (order.statusCode !== 200) {
        return errorResponse(res, order.statusCode, order.message);
      }

      return successResponse(res, order.statusCode, order.message, order.data);
    } catch (error) {
      logger.error(
        `getManufacturerOrderByIdController -> error: ${error.message}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for updating an order by id for a manufacturer
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getAllAdminOrdersController(req, res) {
    const { page = 1, limit = 20 } = req.query;
    try {
      const orders = await OrderService.getAllAdminOrdersService({
        page,
        limit,
      });
      logger.info(
        `getAllAdminOrdersController -> orders: ${JSON.stringify(orders)}`
      );
      return successResponse(
        res,
        orders.statusCode,
        orders.message,
        orders.data
      );
    } catch (error) {
      logger.error(`getAllAdminOrdersController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for updating an order by id for a manufacturer
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getAdminOrderByIdController(req, res) {
    try {
      const { user, params } = req;
      const order = await OrderService.getAdminOrderByIdService(params);
      logger.info(
        `getAdminOrderByIdController -> order: ${JSON.stringify(order)}`
      );
      return successResponse(res, order.statusCode, order.message, order.data);
    } catch (error) {
      logger.error(`getAdminOrderByIdController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for updating an order payment status by id for an admin
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async updateAdminOrderPaymentStatusController(req, res) {
    try {
      const { user, params, body } = req;
      const order = await OrderService.updateAdminOrderPaymentStatusService(
        user,
        params,
        body
      );
      logger.info(
        `updateAdminOrderPaymentStatusController -> order: ${JSON.stringify(
          order
        )}`
      );
      return successResponse(res, order.statusCode, order.message, order.data);
    } catch (error) {
      logger.error(
        `updateAdminOrderPaymentStatusController -> error: ${error.message}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }
}

export default OrderController;
