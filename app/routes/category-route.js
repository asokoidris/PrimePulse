import express from 'express';
import CategoryController from '../controllers/category-controller.js';
import AuthenticationMiddleware from '../middleware/authentication-middleware.js';
import { validate } from '../validations/validatorClass.js';
import {
  categorySchema,
  createSubcategorySchema,
  updateCategorySchema,
  getCategoryByIdSchema,
  updateSubCategorySchema,
  getSubCategoryByIdSchema,
} from '../validations/schema/category.js';
import { paginationSchema } from '../validations/schema/pagination.js';

const router = express();

router.post(
  '/',
  validate(categorySchema),
  AuthenticationMiddleware.isAdminAuthenticated,
  CategoryController.createCategoryController
);

router.patch(
  '/:category_id',
  validate(updateCategorySchema),
  AuthenticationMiddleware.isAdminAuthenticated,
  CategoryController.updateCategoryController
);

router.get(
  '/',
  validate(paginationSchema),
  CategoryController.getAllCategoriesController
);

router.get(
  '/:category_id',
  validate(getCategoryByIdSchema),
  CategoryController.getCategoryByIdController
);

router.delete(
  '/:category_id',
  validate(updateCategorySchema),
  AuthenticationMiddleware.isAdminAuthenticated,
  CategoryController.disableCategoryByIdController
);

router.patch(
  '/reactivate/:category_id',
  validate(updateCategorySchema),
  AuthenticationMiddleware.isAdminAuthenticated,
  CategoryController.reactivateCategoryByIdController
);

router.post(
  '/subcategory',
  validate(createSubcategorySchema),
  AuthenticationMiddleware.isAdminAuthenticated,
  CategoryController.createSubCategoryController
);

router.get(
  '/all/subcategories',
  validate(paginationSchema),
  CategoryController.getAllSubCategoriesController
);

router.get(
  '/subcategory/:subcategory_id',
  validate(getSubCategoryByIdSchema),
  CategoryController.getSubCategoryByIdController
);

router.patch(
  '/subcategory/:subcategory_id',
  validate(updateSubCategorySchema),
  AuthenticationMiddleware.isAdminAuthenticated,
  CategoryController.updateSubCategoryByIdController
);

// NOTE: complete the documentation for this route
router.delete(
  '/subcategory/:subcategory_id',
  validate(updateSubCategorySchema),
  AuthenticationMiddleware.isAdminAuthenticated,
  CategoryController.disableSubCategoryByIdController
);

// NOTE: complete the documentation for this route
router.patch(
  '/subcategory/reactivate/:subcategory_id',
  validate(updateSubCategorySchema),
  AuthenticationMiddleware.isAdminAuthenticated,
  CategoryController.reactivateSubCategoryByIdController
);

export default router;
