import express from 'express';
import { validate } from '../validations/validatorClass';
import {
  productSchema,
  updateProductSchema,
  productByIdSchema,
} from '../validations/schema/product';
import { paginationSchema } from '../validations/schema/pagination';
import ProductController from '../controllers/product-controller';
import AuthenticationMiddleware from '../middleware/authentication-middleware';

const router = express();

router.post(
  '/',
  AuthenticationMiddleware.isUserAuthenticated,
  AuthenticationMiddleware.isManufacturer,
  validate(productSchema),
  ProductController.createProductController
);

router.patch(
  '/:id',
  AuthenticationMiddleware.isUserAuthenticated,
  AuthenticationMiddleware.isManufacturer,
  validate(updateProductSchema),
  ProductController.updateProductByIdController
);

router.get(
  '/',
  validate(paginationSchema),
  ProductController.getAllProductsController
);

router.get(
  '/:id',
  validate(productByIdSchema),
  ProductController.getProductByIdController
);

router.get(
  '/category/:id',
  validate(productByIdSchema),
  ProductController.getProductsByCategoryController
);

router.get(
  '/subcategory/:id',
  validate(productByIdSchema),
  ProductController.getProductsBySubCategoryController
);

router.delete(
  '/:id',
  AuthenticationMiddleware.isUserAuthenticated,
  AuthenticationMiddleware.isManufacturer,
  validate(productByIdSchema),
  ProductController.deleteProductController
);
export default router;
