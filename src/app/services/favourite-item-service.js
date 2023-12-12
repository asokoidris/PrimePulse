import FavoriteItemModel from '../models/favourite-item-model';
import HelperFunctions from '../utils/helper-functions';

/**
 * @description Favourite Item Service
 */
class FavouriteItemService {
  /**
   * @description function to Create a favourite item
   * @param {Object} user  - req user object from the Favourite Item Controller
   * @param {Object} product  - req product object from the Favourite Item Controller
   * @return {Object} Returned object
   */
  static async createFavouriteItemService(user, product) {
    const { productId } = product;
    const favouriteItemExist = await FavoriteItemModel.findOne({
      userId: user.id || user._id,
      productId,
    });

    if (favouriteItemExist)
      return {
        statusCode: 400,
        message: 'Item already added to favourite',
      };

    const newFavouriteItem = await FavoriteItemModel.create({
      userId: user.id || user._id,
      productId,
    });
    logger.info(
      `createFavouriteItemService -> newFavouriteItem: ${JSON.stringify(
        newFavouriteItem
      )}`
    );
    return {
      statusCode: 201,
      message: 'Favourite item added successfully',
      data: newFavouriteItem,
    };
  }

  /**
   * @description function to get all favourite items by user
   * @param {Object} data - req body object from the Favourite Item Controller
   *  @param {Object} user - req user object from the Favourite Item Controller
   * @return {Object} Returned object
   */
  static async getAllFavouriteItemsService(user, query) {
    const { page = 1, limit = 20 } = query;

    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 20,
      sort: { createdAt: -1 },
      populate: {
        path: 'productId',
      },
    };

    const favouriteItems = await FavoriteItemModel.paginate(
      { userId: user.id || user._id },
      options
    );

    if (!favouriteItems.length)
      return {
        statusCode: 404,
        message: 'No favourite item found',
      };

    return {
      statusCode: 200,
      message: 'Favourite items fetched successfully',
      data: favouriteItems,
    };
  }

  /**
   * @description function to get a favourite item by id
   * @param {Object} user - req user object from the Favourite Item Controller
   * @param {Object} product - req product object from the Favourite Item Controller
   * @return {Object} Returned object
   */
  static async getFavouriteItemByIdService(user, data) {
    const favouriteItem = await FavoriteItemModel.findOne({
      _id: data.id,
      userId: user.id || user._id,
    }).populate('productId');

    if (!favouriteItem)
      return {
        statusCode: 404,
        message: 'No favourite item found',
      };

    logger.info(
      `getFavouriteItemByIdService -> favouriteItem: ${JSON.stringify(
        favouriteItem
      )}`
    );

    return {
      statusCode: 200,
      message: 'Favourite item fetched successfully',
      data: favouriteItem,
    };
  }

  /**
   * @description function to delete a favourite item
   * @param {Object} data - req body object from the Favourite Item Controller
   * @return {Object} Returned object
   */
  static async deleteFavouriteItemService(user, product) {
    const favouriteItemExist = await FavoriteItemModel.findOne({
      userId: user.id || user._id,
      productId: product.id || product._id,
    });

    if (!favouriteItemExist)
      return {
        statusCode: 404,
        message: 'Item not found in favourite',
      };

    await FavoriteItemModel.deleteOne({
      userId: user.id || user._id,
      productId: product.id || product._id,
    });

    return {
      statusCode: 200,
      message: 'Favourite item deleted successfully',
    };
  }
}
export default FavouriteItemService;
