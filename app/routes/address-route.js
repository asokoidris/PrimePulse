import express from 'express';
import { validate } from '../validations/validatorClass.js';
import {
  createAddressSchema,
  updateAddressSchema,
  addressByIdSchema,
} from '../validations/schema/address.js';
import { paginationSchema } from '../validations/schema/pagination.js';
import AuthenticationMiddleware from '../middleware/authentication-middleware.js';
import AddressController from '../controllers/address-controller.js';

const router = express();

router.post(
  '/',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(createAddressSchema),
  AddressController.createAddressController
);

router.patch(
  '/:id',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(updateAddressSchema),
  AddressController.updateAddressController
);

router.get(
  '/',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(paginationSchema),
  AddressController.getAllAddressController
);

router.get(
  '/:id',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(addressByIdSchema),
  AddressController.getAddressByIdController
);

router.delete(
  '/:id',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(addressByIdSchema),
  AddressController.deleteAddressController
);

export default router;
