import express from 'express';
import {
  cartSchema,
  cartByIdSchema,
  updateCartSchema,
} from '../validations/schema/cart';
import { validate } from '../validations/validatorClass';
import CartController from '../controllers/cart-controller';
import AuthenticationMiddleware from '../middleware/authentication-middleware';

const router = express.Router();

router.post(
  '/',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(cartSchema),
  CartController.addToCartController
);

router.get(
  '/',
  AuthenticationMiddleware.isUserAuthenticated,
  CartController.getCartController
);

router.delete(
  '/:id',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(cartByIdSchema),
  CartController.removeCartItemController
);

router.patch(
  '/:id/:quantity',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(updateCartSchema),
  CartController.updateCartItemByQuantityController
);

export default router;
