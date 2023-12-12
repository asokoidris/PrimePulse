import express from 'express';
import { validate } from '../validations/validatorClass';
import {
  createBankSchema,
  updateBankSchema,
  bankByIdSchema,
} from '../validations/schema/bank';
import AuthenticationMiddleware from '../middleware/authentication-middleware';
import BankController from '../controllers/bank-controller';
import { paginationSchema } from '../validations/schema/pagination';

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
