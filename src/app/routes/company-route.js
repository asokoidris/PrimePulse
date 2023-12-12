import express from 'express';
import { validate } from '../validations/validatorClass';
import {
  companySchema,
  updateCompanySchema,
  companyByIdSchema,
} from '../validations/schema/company';
import { paginationSchema } from '../validations/schema/pagination';
import CompanyController from '../controllers/company-controller';
import AuthenticationMiddleware from '../middleware/authentication-middleware';
const router = express();

router.post(
  '/',
  validate(companySchema),
  AuthenticationMiddleware.isUserAuthenticated,
  AuthenticationMiddleware.isManufacturer,
  CompanyController.createCompanyController
);

router.patch(
  '/:id',
  validate(updateCompanySchema),
  AuthenticationMiddleware.isUserAuthenticated,
  AuthenticationMiddleware.isManufacturer,
  CompanyController.updateCompanyController
);

router.get(
  '/',
  AuthenticationMiddleware.isUserAuthenticated,
  AuthenticationMiddleware.isManufacturer,
  validate(paginationSchema),
  CompanyController.getAllCompaniesController
);

router.get(
  '/:id',
  AuthenticationMiddleware.isUserAuthenticated,
  AuthenticationMiddleware.isManufacturer,
  validate(companyByIdSchema),
  CompanyController.getCompanyByIdController
);

router.delete(
  '/:id',
  AuthenticationMiddleware.isUserAuthenticated,
  AuthenticationMiddleware.isManufacturer,
  validate(companyByIdSchema),
  CompanyController.deleteCompanyController
);

export default router;
