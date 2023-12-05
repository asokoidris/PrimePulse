import CartModel from '../models/cart-model.js';
import ProductModel from '../models/product-model.js';

/**
 * @description Cart Service
 */
class CartService {
  /**
   * @description function to add items to cart
   * @param {Object} user  - req user object from the Cart Controller
   * @param {Object} data  - req product object from the Cart Controller
   * @return {Object} Returned object
   */
  static async addToCartService(user, data) {
    const { product, quantity } = data;

    const productExists = await ProductModel.findById(product);

    if (!productExists)
      return {
        statusCode: 404,
        message: 'Product not found or already deleted',
      };

    const cartItem = await CartModel.findOne({
      user: user.id || user._id,
      productId: product,
    });

    if (cartItem) {
      cartItem.quantity = cartItem.quantity + quantity;
      cartItem.price = cartItem.price + productExists.price * quantity;
      await cartItem.save();
      logger.info(`addToCartServiceService -> cartItem: ${cartItem}`);

      return {
        statusCode: 200,
        message: 'Cart item updated successfully',
        data: cartItem,
      };
    }

    const newCartItem = await CartModel.create({
      user: user.id || user._id,
      productId: product,
      quantity,
      price: productExists.price * quantity,
    });
    logger.info(`addToCartServiceService -> newCartItem: ${newCartItem}`);

    return {
      statusCode: 201,
      message: 'Cart item added successfully',
      data: newCartItem,
    };
  }

  /**
   * @description function to view all items in cart by user
   * @param {Object} user - req user object from the Cart Controller
   * @return {Object} Returned object
   */
  static async getCartService(user) {
    const cartItems = await CartModel.find({ user: user.id || user._id })
      .populate('productId')
      .exec();
    logger.info(`getCartService -> cartItems: ${cartItems}`);

    return {
      statusCode: 200,
      message: 'Cart items retrieved successfully',
      data: cartItems,
    };
  }

  /**
   * @description function to delete a cart by id
   * @param {Object} user - req user object from the Cart Controller
   * @param {Object} params - req params object from the Cart Controller
   * @return {Object} Returned object
   */
  static async removeCartItemService(userId, params) {
    const cart = await CartModel.findOne({ _id: params.id, user: userId });

    if (!cart)
      return {
        statusCode: 404,
        message: 'Cart not found or already deleted',
      };

    await CartModel.deleteOne({ _id: params.id, user: userId });

    logger.info(`removeCartItemService -> cart: ${cart}`);

    return {
      statusCode: 200,
      message: 'Cart item deleted successfully',
    };
  }

  /**
   * @description function to delete a cart by quantity
   * @param {Object} user - req user object from the Cart Controller
   * @param {Object} data - req params object from the Cart Controller
   * @return {Object} Returned object
   */
  static async updateCartItemByQuantityService(user, data) {
    const { id, quantity } = data;

    const cart = await CartModel.findOne({
      _id: id,
      user: user.id || user._id,
    });

    if (!cart)
      return {
        statusCode: 404,
        message: 'Cart not found or already deleted',
      };

    if (cart.quantity - quantity <= 0) {
      await cart.remove();
      return {
        statusCode: 200,
        message: 'Cart item deleted successfully',
      };
    }

    cart.quantity = cart.quantity - quantity;

    await cart.save();

    logger.info(`updateCartItemByQuantityService -> cart: ${cart}`);

    return {
      statusCode: 200,
      message: 'Cart item updated successfully',
      data: cart,
    };
  }
}

export default CartService;
