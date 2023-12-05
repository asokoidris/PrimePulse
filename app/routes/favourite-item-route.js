import express from 'express';
import { validate } from '../validations/validatorClass.js';
import {
  favouriteItemSchema,
  favouriteItemByIdSchema,
} from '../validations/schema/favourite-item.js';
import { paginationSchema } from '../validations/schema/pagination.js';
import FavouriteItemController from '../controllers/favourite-item-controller.js';
import AuthenticationMiddleware from '../middleware/authentication-middleware.js';

const router = express();

router.post(
  '/',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(favouriteItemSchema),
  FavouriteItemController.createFavouriteItemController
);

router.get(
  '/',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(paginationSchema),
  FavouriteItemController.getFavouriteItemsController
);

router.get(
  '/:id',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(favouriteItemByIdSchema),
  FavouriteItemController.getFavouriteItemByIdController
);

router.delete(
  '/:id',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(favouriteItemByIdSchema),
  FavouriteItemController.deleteFavouriteItemController
);

export default router;
