import express from 'express';
import { validate } from '../validations/validatorClass.js';
import {
  orderValidationSchema,
  orderByIdSchema,
  updateOrderPaymentStatusSchema,
} from '../validations/schema/order.js';
import { paginationSchema } from '../validations/schema/pagination.js';
import AuthenticationMiddleware from '../middleware/authentication-middleware.js';
import OrderController from '../controllers/order-controller.js';

const router = express();

// NOTE: this order endpoint is for the users
router.post(
  '/',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(orderValidationSchema),
  OrderController.createOrderController
);

router.get(
  '/',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(paginationSchema),
  OrderController.getAllOrdersController
);

router.get(
  '/:id',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(orderByIdSchema),
  OrderController.getOrderByIdController
);

router.delete(
  '/:id',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(orderByIdSchema),
  OrderController.deleteOrderController
);

// NOTE: this order endpoint is for the manufacturer
router.get(
  '/all/manufacturer',
  AuthenticationMiddleware.isUserAuthenticated,
  AuthenticationMiddleware.isManufacturer,
  validate(paginationSchema),
  OrderController.getAllManufacturerOrdersController
);

router.get(
  '/manufacturer/:id',
  AuthenticationMiddleware.isUserAuthenticated,
  AuthenticationMiddleware.isManufacturer,
  validate(orderByIdSchema),
  OrderController.getManufacturerOrderByIdController
);

// NOTE: this order endpoint is for the admin
router.get(
  '/all/admins',
  AuthenticationMiddleware.isAdminAuthenticated,
  validate(paginationSchema),
  OrderController.getAllAdminOrdersController
);

router.get(
  '/admin/:id',
  AuthenticationMiddleware.isAdminAuthenticated,
  validate(orderByIdSchema),
  OrderController.getAdminOrderByIdController
);

router.patch(
  '/admin/update-payment-status/:id',
  AuthenticationMiddleware.isAdminAuthenticated,
  validate(updateOrderPaymentStatusSchema),
  OrderController.updateAdminOrderPaymentStatusController
);

export default router;
