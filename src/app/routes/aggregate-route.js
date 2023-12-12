import express from 'express';
import { validate } from '../validations/validatorClass';
import { getCategoryByIdSchema } from '../validations/schema/category';
import CategoryController from '../controllers/category-controller';

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
