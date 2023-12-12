import OrderModel from '../models/order-model';
import CartModel from '../models/cart-model';
import ProductModel from '../models/product-model';
import AddressModel from '../models/address-model';
import { ORDER_STATUS } from '../utils/constant/options';

/**
 * @description Order Service
 * @class OrderService
 */

class OrderService {
  /**
   * @description function to create a new order
   * @param {Object} user - req user object from the Order Controller
   * @param {Object} order - req order object from the Order Controller
   * @return {Object} Returned object
   */
  static async createOrderService(user, order) {
    const { shippingAddress } = order;
    const shippingAddressExists = await AddressModel.findOne({
      userId: user.id || user._id,
      _id: shippingAddress,
    });

    console.log('shippingAddressExists', shippingAddressExists);

    if (!shippingAddressExists)
      return {
        statusCode: 400,
        message: 'Shipping address does not exist',
      };

    const cartItems = await CartModel.find({ user: user.id || user._id });
    console.log('cartItems', cartItems);

    if (!cartItems.length > 0)
      return {
        statusCode: 400,
        message: 'Cart is empty',
      };

    const items = [];
    const manufacturerIds = [];
    let totalPrice = 0;
    for (const item of cartItems) {
      const product = await ProductModel.findById(item.productId);
      if (!product)
        return {
          statusCode: 400,
          message: 'Product does not exist',
        };
      const price = item.price;
      const quantity = item.quantity;
      items.push({
        product: product._id || product.id,
        name: product.name,
        quantity,
        price,
      });
      if (!manufacturerIds.includes(product.owner))
        manufacturerIds.push(product.owner);
      totalPrice += price;
    }
    const newOrder = await OrderModel.create({
      manufacturerIds,
      userId: user.id || user._id,
      items,
      totalPrice,
      shippingAddress,
    });
    await CartModel.deleteMany({ user });
    logger.info(`createOrderService -> newOrder: ${JSON.stringify(newOrder)}`);

    return {
      statusCode: 201,
      message: 'Order created successfully',
      data: newOrder,
    };
  }

  /**
   * @description function to get all orders
   * @param {Object} user - req user object from the Order Controller
   * @return {Object} Returned object
   * @memberof OrderService
   */
  static async getAllOrdersService(user, query) {
    const { page = 1, limit = 20 } = query;

    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 20,
      sort: { createdAt: -1 },
      populate: {
        path: 'items.product',
      },
    };

    const orders = await OrderModel.paginate(
      { userId: user.id || user._id },
      options
    );

    logger.info(`getAllOrdersService -> orders: ${JSON.stringify(orders)}`);
    return {
      statusCode: 200,
      message: 'Orders retrieved successfully',
      data: orders,
    };
  }

  /**
   * @description function to get an order by id
   * @param {Object} user - req user object from the Order Controller
   * @param {Object} id - req id object from the Order Controller
   * @return {Object} Returned object
   * @memberof OrderService
   */

  static async getOrderByIdService(user, data) {
    const order = await OrderModel.findOne({
      _id: data.id,
      userId: user.id || user._id,
    });
    logger.info(`getOrderByIdService -> order: ${JSON.stringify(order)}`);
    if (!order)
      return {
        statusCode: 404,
        message: 'Order not found',
      };
    return {
      statusCode: 200,
      message: 'Order retrieved successfully',
      data: order,
    };
  }

  /**
   * @description function to update an order by id
   * @param {Object} user - req user object from the Order Controller
   * @param {Object} id - req id object from the Order Controller
   * @param {Object} data - req data object from the Order Controller
   * @return {Object} Returned object
   * @memberof OrderService
   */
  static async deleteOrderByIdService(user, data) {
    const order = await OrderModel.findOne({
      _id: data.id,
      userId: user.id || user._id,
      status: ORDER_STATUS.PENDING,
      payment: {
        paymentStatus: ORDER_STATUS.CANCELLED,
      },
    });

    if (!order)
      return {
        statusCode: 404,
        message: 'Order not found',
      };

    if (order.status !== ORDER_STATUS.PENDING)
      return {
        statusCode: 400,
        message: 'Order cannot be cancelled',
      };

    const deletedOrder = await OrderModel.findByIdAndUpdate(
      data.id,
      { status: ORDER_STATUS.CANCELLED },
      { new: true }
    );
    logger.info(`deleteOrderByIdService -> order: ${JSON.stringify(order)}`);
    return {
      statusCode: 200,
      message: 'Order deleted successfully',
      data: deletedOrder,
    };
  }

  /**
   * @description function to get all manufacturer orders
   * @param {Object} user - req user object from the Order Controller
   * @return {Object} Returned object
   */
  static async getAllManufacturerOrdersService(user, query) {
    const { page = 1, limit = 20 } = query;

    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 20,
      sort: { createdAt: -1 },
      populate: {
        path: 'items.product',
      },
    };

    const orders = await OrderModel.paginate(
      { manufacturerIds: user._id || user.id },
      options
    );

    const manufacturerOrders = orders
      .filter((order) => {
        return order.manufacturerIds.includes(user._id);
      })
      .map((order) => {
        const orderItems = order.items
          .filter(
            (item) => item.product.owner.toString() === user._id.toString()
          )
          .map((item) => {
            return {
              ...item,
              price: item.product.price * item.quantity,
            };
          });

        const totalPrice = orderItems.reduce((total, item) => {
          return total + item.price;
        }, 0);

        return {
          _id: order._id,
          items: orderItems,
          totalPrice,
          status: order.status,
          payment: order.payment,
          shippingAddress: order.shippingAddress,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          manufacturerIds: [user._id],
        };
      });

    logger.info(
      `getAllManufacturerOrdersService -> orders: ${JSON.stringify(
        manufacturerOrders
      )}`
    );
    return {
      statusCode: 200,
      message: 'Orders retrieved successfully',
      data: manufacturerOrders,
    };
  }

  /**
   * @description function to get a single manufacturer order by id
   * @param {Object} user - req user object from the Order Controller
   * @param {Object} data - req data object from the Order Controller
   * @return {Object} Returned object
   */
  static async getManufacturerOrderByIdService(user, data) {
    const { id } = data;
    const order = await OrderModel.findById(id)
      .populate('items.product', 'name price owner')
      .populate('shippingAddress');

    if (!order) {
      return {
        statusCode: 404,
        message: 'Order not found',
      };
    }

    if (!order.manufacturerIds.includes(user._id)) {
      return {
        statusCode: 403,
        message: 'You are not authorized to view this order',
      };
    }

    const orderItems = order.items
      .filter((item) => item.product.owner.toString() === user._id.toString())
      .map((item) => {
        return {
          ...item,
          price: item.product.price * item.quantity,
        };
      });

    const totalPrice = orderItems.reduce((total, item) => {
      return total + item.price;
    }, 0);

    const manufacturerOrder = {
      _id: order._id,
      items: orderItems,
      totalPrice,
      status: order.status,
      payment: order.payment,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      manufacturerIds: [user._id],
    };

    logger.info(
      `getSingleManufacturerOrderByIdService -> order: ${JSON.stringify(
        manufacturerOrder
      )}`
    );
    return {
      statusCode: 200,
      message: 'Order retrieved successfully',
      data: manufacturerOrder,
    };
  }

  /**
   * @description function to get update payment status by an admin
   * @param {Object} user - req user object from the Order Controller
   * @param {Object} data - req data object from the Order Controller
   * @return {Object} Returned object
   */
  static async updateAdminOrderPaymentStatusService(user, params, data) {
    const { id } = params;
    const { paymentStatus } = data;

    const order = await OrderModel.findById(id);

    if (!order) {
      return {
        statusCode: 404,
        message: 'Order not found',
      };
    }

    if (order.payment.paymentStatus === ORDER_STATUS.PAID) {
      return {
        statusCode: 400,
        message: 'Order has already been paid',
      };
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      {
        payment: {
          paymentStatus,
          paymentDate: Date.now(),
        },
      },
      { new: true }
    );

    logger.info(
      `updatePaymentStatusService -> order: ${JSON.stringify(updatedOrder)}`
    );
    return {
      statusCode: 200,
      message: 'Order payment status updated successfully',
      data: updatedOrder,
    };
  }

  /**
   * @description function to get all orders by an admin
   * @return {Object} Returned object
   */
  static async getAllAdminOrdersService(query) {
    const { page = 1, limit = 20 } = query;

    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 20,
      sort: { createdAt: -1 },
      populate: [
        { path: 'userId' },
        { path: 'manufacturerIds' },
        { path: 'items.product' },
        { path: 'shippingAddress' },
      ],
    };

    const orders = await OrderModel.paginate({}, options);

    logger.info(
      `getAllOrdersByAdminService -> orders: ${JSON.stringify(orders)}`
    );
    return {
      statusCode: 200,
      message: 'Orders retrieved successfully',
      data: orders,
    };
  }

  /**
   * @description function to get a single order by id by an admin
   * @param {Object} data - req data object from the Order Controller
   * @return {Object} Returned object
   */
  static async getAdminOrderByIdService(data) {
    const { id } = data;

    const order = await OrderModel.findById(id)
      .populate('userId')
      .populate('manufacturerIds')
      .populate('items.product')
      .populate('shippingAddress');

    if (!order) {
      return {
        statusCode: 404,
        message: 'Order not found',
      };
    }

    logger.info(
      `getSingleOrderByIdByAdminService -> order: ${JSON.stringify(order)}`
    );

    return {
      statusCode: 200,
      message: 'Order retrieved successfully',
      data: order,
    };
  }
}

export default OrderService;
