import express from 'express';

import AuthController from '../controllers/auth-controller.js';
import { validate } from '../validations/validatorClass.js';
import {
  signUpSchema,
  loginSchema,
  changePasswordSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  adminLoginSchema,
  onboardAdminSchema,
} from '../validations/schema/auth.js';
import AuthenticationMiddleware from '../middleware/authentication-middleware.js';
import keys from '../config/keys.js';

const router = express();

router.post(
  '/signup',
  validate(signUpSchema),
  AuthController.userRegistrationController
);

router.post(
  '/login',
  validate(loginSchema),
  AuthController.userLoginController
);

router.patch(
  '/change-password',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(changePasswordSchema),
  AuthController.changePasswordController
);

router.post(
  '/forgot-password',
  validate(forgetPasswordSchema),
  AuthController.forgetPasswordController
);

router.patch(
  '/reset-password',
  validate(resetPasswordSchema),
  AuthController.resetUserPasswordController
);

router.post(
  `/${keys.adminUrl}/login`,
  validate(adminLoginSchema),
  AuthController.adminLoginController
);

router.post(
  `/${keys.adminUrl}/onboard-admin`,
  validate(onboardAdminSchema),
  AuthenticationMiddleware.isAdminAuthenticated,
  AuthenticationMiddleware.isSuperAdmin, //NOTE: for now we are only allowing super admin to onboard admin
  AuthController.onboardAdminController
);

export default router;
