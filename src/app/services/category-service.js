import mongoose from 'mongoose';
import CategoryModel from '../models/category-model';
import SubCategoryModel from '../models/subcategory-model';
import { CATEGORY_OR_SUBCATEGORY_STATUS } from '../utils/constant/options';

/**
 * @description Category Service
 */

class CategoryService {
  /**
   * @description function to create a category
   * @param {Object} data - req body object from the Category Controller
   * @return {Object} Returned object
   */
  static async createCategoryService(data) {
    const { name, description } = data;
    const category = await CategoryModel.findOne({ name });

    if (category)
      return {
        statusCode: 409,
        message: 'Category already exists',
      };

    const newCategory = await CategoryModel.create({
      name,
      description,
    });

    if (!newCategory)
      return {
        statusCode: 500,
        message: 'Error creating category',
      };

    logger.info(`createCategoryService -> newCategory: ${newCategory}`);

    return {
      statusCode: 201,
      message: 'Category created successfully',
      data: newCategory,
    };
  }

  /**
   * @description function to update a category
   * @param {string} categoryId - the ID of the category to update
   * @param {Object} data - req body object from the Category Controller
   * @return {Object} Returned object
   */
  static async updateCategoryService(categoryId, data) {
    // don't forget we need to check if the name is part of the data object and if it is, we need to check if it already exists
    const { name } = data;

    if (name) {
      const category = await CategoryModel.findOne({ name });

      if (category && category.id !== categoryId)
        return {
          statusCode: 409,
          message: 'Category already exists',
        };
    }

    const category = await CategoryModel.findByIdAndUpdate(
      { _id: categoryId },
      {
        ...data,
      },
      { new: true }
    );

    if (!category)
      return {
        statusCode: 500,
        message: 'Error updating category',
      };

    logger.info(`updateCategoryService -> category: ${category}`);

    return {
      statusCode: 200,
      message: 'Category updated successfully',
      data: category,
    };
  }

  /**
   * @description function to get all categories
   * @return {Object} Returned object
   */
  static async getAllCategoriesService(query) {
    const { page = 1, limit = 20 } = query;

    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 20,
      sort: { createdAt: -1 },
    };

    const categories = await CategoryModel.paginate(
      { status: CATEGORY_OR_SUBCATEGORY_STATUS.ACTIVE },
      options
    );

    logger.info(`getAllCategoriesService -> categories: ${categories}`);

    return {
      statusCode: 200,
      message: 'Categories retrieved successfully',
      data: categories,
    };
  }

  /**
   * @description function to get a category by ID
   * @param {string} categoryId - the ID of the category to get
   * @return {Object} Returned object
   */
  static async getCategoryByIdService(categoryId) {
    const category = await CategoryModel.findOne({ _id: categoryId });

    if (!category)
      return {
        statusCode: 404,
        message: 'Category not found',
      };

    logger.info(
      `getCategoryByIdService -> category: ${JSON.stringify(category)}`
    );

    return {
      statusCode: 200,
      message: 'Category retrieved successfully',
      data: category,
    };
  }

  /**
   * @description function to delete a category by ID
   * @param {string} categoryId - the ID of the category to delete
   * @return {Object} Returned object
   */
  static async disableCategoryByIdService(categoryId) {
    const category = await CategoryModel.findById(categoryId);

    if (!category)
      return {
        statusCode: 404,
        message: 'Category not found',
      };

    category.status = CATEGORY_OR_SUBCATEGORY_STATUS.DISABLED;
    await category.save();
    logger.info(
      `disableCategoryByIdService -> category, ${JSON.stringify(category)}`
    );

    return {
      statusCode: 200,
      message: 'Category disabled successfully',
    };
  }

  /**
   * @description function to reactivate a category by ID
   * @param {string} categoryId - the ID of the category to delete
   * @return {Object} Returned object
   */
  static async reactivateCategoryByIdService(categoryId) {
    const category = await CategoryModel.findById(categoryId);

    if (!category)
      return {
        statusCode: 404,
        message: 'Category not found',
      };

    // update the status of the category to disabled

    category.status = CATEGORY_OR_SUBCATEGORY_STATUS.ACTIVE;
    await category.save();
    logger.info(
      `reactivateCategoryByIdService -> category, ${JSON.stringify(category)}`
    );

    return {
      statusCode: 200,
      message: `Category ${category.name} reactivated successfully`,
    };
  }

  /**
   * @description function to create a subcategory
   * @param {Object} data - req body object from the Category Controller
   * @return {Object} Returned object
   */
  static async createSubCategoryService(data) {
    const { name, description, categoryId } = data;

    const category = CategoryModel.findById(categoryId);

    if (!category)
      return {
        statusCode: 404,
        message: 'Category not found',
      };

    const subCategory = await SubCategoryModel.findOne({ name, categoryId });

    if (subCategory)
      return {
        statusCode: 409,
        message: 'Subcategory already exists for this category',
      };

    const newSubCategory = await SubCategoryModel.create({
      name,
      description,
      categoryId,
    });

    if (!newSubCategory)
      return {
        statusCode: 500,
        message: 'Error creating subcategory',
      };

    return {
      statusCode: 201,
      message: 'Subcategory created successfully',
      data: newSubCategory,
    };
  }

  /**
   * @description function to get category by ID
   * @param {string} subCategoryId - the ID of the subcategory to update
   * @return {Object} Returned object
   */
  static async getSubCategoryByIdService(subCategoryId) {
    const subCategory = await SubCategoryModel.findById(subCategoryId);

    if (!subCategory)
      return {
        statusCode: 404,
        message: 'Subcategory not found',
      };

    logger.info(
      `getSubCategoryByIdService -> subCategory: ${JSON.stringify(subCategory)}`
    );

    return {
      statusCode: 200,
      message: 'Subcategory retrieved successfully',
      data: subCategory,
    };
  }

  /**
   * @description function to get all subcategories
   * @return {Object} Returned object
   */
  static async getAllSubCategoriesService(query) {
    const { page = 1, limit = 20 } = query;

    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 20,
      sort: { createdAt: -1 },
    };

    const subCategories = await SubCategoryModel.paginate(
      { status: CATEGORY_OR_SUBCATEGORY_STATUS.ACTIVE },
      options
    );

    logger.info(
      `getAllSubCategoriesService -> subCategories: ${subCategories}`
    );

    return {
      statusCode: 200,
      message: 'Subcategories retrieved successfully',
      data: subCategories,
    };
  }

  /**
   * @description function to update a subcategory by ID
   * @param {string} subCategoryId - the ID of the subcategory to update
   * @param {Object} data - req body object from the Category Controller
   * @return {Object} Returned object
   */
  static async updateSubCategoryByIdService(subCategoryId, data) {
    const { name, categoryId } = data;

    if (name) {
      const subCategory = await SubCategoryModel.findOne({ name, categoryId });

      if (subCategory && subCategory.id !== subCategoryId)
        return {
          statusCode: 409,
          message: 'Subcategory already exists for this category',
        };
    }

    const subCategory = await SubCategoryModel.findByIdAndUpdate(
      { _id: subCategoryId },
      {
        ...data,
      },
      { new: true }
    );

    if (!subCategory)
      return {
        statusCode: 500,
        message: 'Error updating subcategory',
      };

    logger.info(
      `updateSubCategoryService -> subCategory: ${JSON.stringify(subCategory)}`
    );

    return {
      statusCode: 200,
      message: 'Subcategory updated successfully',
      data: subCategory,
    };
  }

  /**
   * @description function to disable a subcategory by ID
   * @param {string} subCategoryId - the ID of the subcategory to disable
   * @return {Object} Returned object
   */
  static async disableSubCategoryByIdService(subCategoryId) {
    const subcategories = await SubCategoryModel.findById(subCategoryId);

    if (!subcategories)
      return {
        statusCode: 404,
        message: 'Subcategory not found',
      };

    subcategories.status = CATEGORY_OR_SUBCATEGORY_STATUS.DISABLED;
    await subcategories.save();
    logger.info(
      `disableSubCategoryByIdService -> subcategories, ${JSON.stringify(
        subcategories
      )}`
    );

    return {
      statusCode: 200,
      message: `Subcategory ${subcategories.name} disabled successfully`,
    };
  }

  /**
   * @description function to reactivate a subcategory by ID
   * @param {string} subCategoryId - the ID of the subcategory to reactivate
   * @return {Object} Returned object
   */
  static async reactivateSubCategoryByIdService(subCategoryId) {
    const subcategory = await SubCategoryModel.findById(subCategoryId);

    if (!subcategory)
      return {
        statusCode: 404,
        message: 'Subcategory not found',
      };

    subcategory.status = CATEGORY_OR_SUBCATEGORY_STATUS.ACTIVE;
    await subcategory.save();
    logger.info(
      `reactivateSubCategoryByIdService -> subcategory, ${JSON.stringify(
        subcategory
      )}`
    );

    return {
      statusCode: 200,
      message: `Subcategory ${subcategory.name} reactivated successfully`,
    };
  }

  /**
   * @description function to get all categories and subcategories
   * @return {Object} Returned object
   */
  static async getCategoriesAndSubCategoriesService() {
    const getAllCategoriesAndSubCategories = await CategoryModel.aggregate([
      { $match: { status: CATEGORY_OR_SUBCATEGORY_STATUS.ACTIVE } },
      {
        $lookup: {
          from: 'subcategories',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'subcategories',
        },
      },
    ]);

    logger.info(
      `getCategoriesAndSubCategoriesService -> getAllCategoriesAndSubCategories: ${JSON.stringify(
        getAllCategoriesAndSubCategories
      )}`
    );

    return {
      statusCode: 200,
      message: 'Categories and subcategories retrieved successfully',
      data: getAllCategoriesAndSubCategories,
    };
  }

  /**
   * @description function to get categories by ID and subcategories
   * @param {string} categoryId - the ID of the category to get subcategories
   * @return {Object} Returned object
   */
  static async getCategoriesByIdAndSubCategoriesService(categoryId) {
    const getAllCategoriesAndSubCategories = await CategoryModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(categoryId),
          status: CATEGORY_OR_SUBCATEGORY_STATUS.ACTIVE,
        },
      },
      {
        $lookup: {
          from: 'subcategories',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'subcategories',
        },
      },
    ]);
    if (
      !getAllCategoriesAndSubCategories.length > 0 ||
      !getAllCategoriesAndSubCategories
    )
      return {
        statusCode: 404,
        message: 'Category not found',
      };

    logger.info(
      `getCategoriesByIdAndSubCategoriesService -> getAllCategoriesAndSubCategories: ${JSON.stringify(
        getAllCategoriesAndSubCategories
      )}`
    );

    return {
      statusCode: 200,
      message: 'Categories and subcategories retrieved successfully',
      data: getAllCategoriesAndSubCategories,
    };
  }
}

export default CategoryService;
