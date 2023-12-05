import express from 'express';
import {
  cartSchema,
  cartByIdSchema,
  updateCartSchema,
} from '../validations/schema/cart.js';
import { validate } from '../validations/validatorClass.js';
import CartController from '../controllers/cart-controller.js';
import AuthenticationMiddleware from '../middleware/authentication-middleware.js';

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
