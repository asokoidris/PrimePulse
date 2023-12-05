import express from 'express';
import { validate } from '../validations/validatorClass.js';
import {
  createBankSchema,
  updateBankSchema,
  bankByIdSchema,
} from '../validations/schema/bank.js';
import AuthenticationMiddleware from '../middleware/authentication-middleware.js';
import BankController from '../controllers/bank-controller.js';
import { paginationSchema } from '../validations/schema/pagination.js';

const router = express();

router.post(
  '/',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(createBankSchema),
  BankController.createBankController
);

router.patch(
  '/:id',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(updateBankSchema),
  BankController.updateBankController
);

router.get(
  '/',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(paginationSchema),
  BankController.getAllBankController
);

router.get(
  '/:id',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(bankByIdSchema),
  BankController.getBankByIdController
);

router.delete(
  '/:id',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(bankByIdSchema),
  BankController.deleteBankController
);
export default router;
