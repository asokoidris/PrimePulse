import { errorResponse, successResponse } from '../utils/response.js';
import { errorResponseMessage } from '../utils/constant/options.js';
import ProductService from '../services/product-service.js';

/**
 * @description Product Controller
 */
class ProductController {
  /**
   * @description Controller for creating a new product
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async createProductController(req, res) {
    const { body, user } = req;
    try {
      const newProduct = await ProductService.createProductService(user, body);
      logger.info(
        `createProductController -> newProduct: ${JSON.stringify(newProduct)}`
      );
      return successResponse(
        res,
        newProduct.statusCode,
        newProduct.message,
        newProduct.data
      );
    } catch (error) {
      logger.error(`createProductController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for retrieving all products
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getAllProductsController(req, res) {
    const { page = 1, limit = 20 } = req.query;
    try {
      const allProducts = await ProductService.getAllProductsService({
        page,
        limit,
      });
      logger.info(
        `getAllProductsController -> allProducts: ${JSON.stringify(
          allProducts
        )}`
      );
      return successResponse(
        res,
        allProducts.statusCode,
        allProducts.message,
        allProducts.data
      );
    } catch (error) {
      logger.error(`getAllProductsController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for retrieving a product by ID
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getProductByIdController(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductByIdService(id);
      logger.info(
        `getProductByIdController -> product: ${JSON.stringify(product)}`
      );
      return successResponse(
        res,
        product.statusCode,
        product.message,
        product.data
      );
    } catch (error) {
      logger.error(`getProductByIdController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }
  /**
   * @description Controller for updating a product by id
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async updateProductByIdController(req, res) {
    const { user, body, params } = req;
    try {
      const updatedProduct = await ProductService.updateProductByIdService(
        user,
        params.id,
        body
      );
      logger.info(
        `updateProductController -> updatedProduct: ${JSON.stringify(
          updatedProduct
        )}`
      );
      return successResponse(
        res,
        updatedProduct.statusCode,
        updatedProduct.message,
        updatedProduct.data
      );
    } catch (error) {
      logger.error(`updateProductController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for deleting a product by id
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async deleteProductController(req, res) {
    const { user, params } = req;
    try {
      const deletedProduct = await ProductService.deleteProductByIdService(
        user,
        params.id
      );
      logger.info(
        `deleteProductController -> deletedProduct: ${JSON.stringify(
          deletedProduct
        )}`
      );
      return successResponse(
        res,
        deletedProduct.statusCode,
        deletedProduct.message,
        deletedProduct.data
      );
    } catch (error) {
      logger.error(`deleteProductController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for retrieving all products by category
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getProductsByCategoryController(req, res) {
    const { id } = req.params;
    try {
      const products = await ProductService.getProductsByCategoryService(id);
      logger.info(
        `getProductsByCategoryController -> products: ${JSON.stringify(
          products
        )}`
      );
      return successResponse(
        res,
        products.statusCode,
        products.message,
        products.data
      );
    } catch (error) {
      logger.error(
        `getProductsByCategoryController -> error: ${error.message}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for retrieving all products by subcategory
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getProductsBySubCategoryController(req, res) {
    const { id } = req.params;
    try {
      const products = await ProductService.getProductsBySubCategoryService(id);
      logger.info(
        `getProductsBySubCategoryController -> products: ${JSON.stringify(
          products
        )}`
      );
      return successResponse(
        res,
        products.statusCode,
        products.message,
        products.data
      );
    } catch (error) {
      logger.error(
        `getProductsBySubCategoryController -> error: ${error.message}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }
}
export default ProductController;
