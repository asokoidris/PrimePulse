import express from 'express';
import { validate } from '../validations/validatorClass.js';
import { getCategoryByIdSchema } from '../validations/schema/category.js';
import CategoryController from '../controllers/category-controller.js';

const router = express();

router.get(
  '/get-categories-and-subcategories',
  CategoryController.getCategoriesAndSubCategoriesController
);

router.get(
  '/get-category-by-id-and-subcategories/:category_id',
  validate(getCategoryByIdSchema),
  CategoryController.getCategoriesByIdAndSubCategoriesController
);

export default router;
