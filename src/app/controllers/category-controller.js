
import CategoryService from '../services/category-service';
import { errorResponse, successResponse } from '../utils/response';
import { errorResponseMessage } from '../utils/constant/options';

/**
 * @description Category Controller
 */
class CategoryController {
  /**
   * @description Get all categories
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} The HTTP response object with the categories data
   */

  static async getAllCategoriesController(req, res) {
    const { page = 1, limit = 20 } = req.query;
    try {
      const categories = await CategoryService.getAllCategoriesService({
        page,
        limit,
      });

      logger.info(
        `getAllCategories -> categories: ${JSON.stringify(categories)}`
      );

      return successResponse(
        res,
        categories.statusCode,
        categories.message,
        categories.data
      );
    } catch (error) {
      logger.error(`getAllCategories -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for creating a new category
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async createCategoryController(req, res) {
    try {
      const category = await CategoryService.createCategoryService(req.body);
      logger.info(
        `createCategoryController -> category: ${JSON.stringify(category)}`
      );

      if (category.statusCode === 409)
        return errorResponse(res, category.statusCode, category.message);

      return successResponse(
        res,
        category.statusCode,
        category.message,
        category.data
      );
    } catch (error) {
      logger.error(`createCategoryController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for updating a category
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async updateCategoryController(req, res) {
    const { category_id } = req.params;
    try {
      const result = await CategoryService.updateCategoryService(
        category_id,
        req.body
      );

      logger.info(
        `updateCategoryController -> result: ${JSON.stringify(result)}`
      );

      if (result.statusCode === 409 || result.statusCode === 500)
        //FIXME: 500 is not a good status code we need to somehow handle this the error maybe from the service leave for @keniiy 😊 for now
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`updateCategoryController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for getting a category by id
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getCategoryByIdController(req, res) {
    const { category_id } = req.params;
    try {
      const category = await CategoryService.getCategoryByIdService(
        category_id
      );

      logger.info(
        `getCategoryByIdController -> category: ${JSON.stringify(category)}`
      );

      if (category.statusCode === 404)
        return errorResponse(res, category.statusCode, category.message);

      return successResponse(
        res,
        category.statusCode,
        category.message,
        category.data
      );
    } catch (error) {
      logger.error(`getCategoryByIdController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for deleting a category
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async disableCategoryByIdController(req, res) {
    const { category_id } = req.params;
    try {
      const result = await CategoryService.disableCategoryByIdService(
        category_id
      );

      logger.info(
        `disableCategoryByIdController -> result: ${JSON.stringify(result)}`
      );

      if (result.statusCode === 404)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`disableCategoryByIdController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for reactivating a category
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async reactivateCategoryByIdController(req, res) {
    const { category_id } = req.params;
    try {
      const result = await CategoryService.reactivateCategoryByIdService(
        category_id
      );

      logger.info(
        `reactivateCategoryByIdController -> result: ${JSON.stringify(result)}`
      );

      if (result.statusCode === 404)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `reactivateCategoryByIdController -> error: ${error.message}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for creating a subcategory
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async createSubCategoryController(req, res) {
    try {
      const result = await CategoryService.createSubCategoryService(req.body);

      logger.info(
        `createSubcategoryForCategoryController -> result: ${JSON.stringify(
          result
        )}`
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
        `createSubcategoryForCategoryController -> error: ${error.message}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for getting a subcategory by id
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getSubCategoryByIdController(req, res) {
    const { subcategory_id } = req.params;
    try {
      const result = await CategoryService.getSubCategoryByIdService(
        subcategory_id
      );

      logger.info(
        `getSubCategoryByIdController -> result: ${JSON.stringify(result)}`
      );

      if (result.statusCode === 404)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `createSubcategoryForCategoryController -> error: ${error.message}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for getting all subcategories
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getAllSubCategoriesController(req, res) {
    const { page = 1, limit = 20 } = req.query;
    try {
      const result = await CategoryService.getAllSubCategoriesService({
        page,
        limit,
      });

      logger.info(
        `getAllSubCategoriesController -> result: ${JSON.stringify(result)}`
      );

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`getAllSubCategoriesController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for updating a subcategory by id
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async updateSubCategoryByIdController(req, res) {
    const { subcategory_id } = req.params;
    try {
      const result = await CategoryService.updateSubCategoryByIdService(
        subcategory_id,
        req.body
      );

      logger.info(
        `updateSubCategoryByIdController -> result: ${JSON.stringify(result)}`
      );

      if (result.statusCode === 404)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `updateSubCategoryByIdController -> error: ${error.message}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for disabling a subcategory by id
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async disableSubCategoryByIdController(req, res) {
    const { subcategory_id } = req.params;
    try {
      const result = await CategoryService.disableSubCategoryByIdService(
        subcategory_id
      );

      logger.info(
        `disableSubCategoryByIdController -> result: ${JSON.stringify(result)}`
      );

      if (result.statusCode === 404)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `disableSubCategoryByIdController -> error: ${error.message}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for reactivating a subcategory by id
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async reactivateSubCategoryByIdController(req, res) {
    try {
      const { subcategory_id } = req.params;
      const result = await CategoryService.reactivateSubCategoryByIdService(
        subcategory_id
      );

      logger.info(
        `reactivateSubCategoryByIdController -> result: ${JSON.stringify(
          result
        )}`
      );

      if (result.statusCode === 404)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `reactivateSubCategoryByIdController -> error: ${error.message}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for getting all categories and subcategories
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getCategoriesAndSubCategoriesController(req, res) {
    try {
      const result =
        await CategoryService.getCategoriesAndSubCategoriesService();

      logger.info(
        `getCategoriesAndSubCategoriesController -> result: ${JSON.stringify(
          result
        )}`
      );

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `reactivateSubCategoryByIdController -> error: ${error.message}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for getting categories by id and subcategories
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getCategoriesByIdAndSubCategoriesController(req, res) {
    try {
      const { category_id } = req.params;
      const result =
        await CategoryService.getCategoriesByIdAndSubCategoriesService(
          category_id
        );

      logger.info(
        `getCategoriesAndSubCategoriesController -> result: ${JSON.stringify(
          result
        )}`
      );

      if (result.statusCode === 404)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `reactivateSubCategoryByIdController -> error: ${error.message}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }
}

export default CategoryController;
