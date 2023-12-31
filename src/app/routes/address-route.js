import express from 'express';
import { validate } from '../validations/validatorClass';
import {
  createAddressSchema,
  updateAddressSchema,
  addressByIdSchema,
} from '../validations/schema/address';
import { paginationSchema } from '../validations/schema/pagination';
import AuthenticationMiddleware from '../middleware/authentication-middleware';
import AddressController from '../controllers/address-controller';

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
