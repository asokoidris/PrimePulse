import joi from 'joi';
import objectId from 'joi-objectid';
import { ORDER_STATUS } from '../../utils/constant/options';

joi.objectId = objectId(joi);

export const orderValidationSchema = joi.object({
  shippingAddress: joi.objectId().required(),
});

export const orderByIdSchema = joi.object({
  id: joi.objectId().required(),
});

export const updateOrderPaymentStatusSchema = joi.object({
  id: joi.objectId().required(),
  paymentStatus: joi
    .string()
    .valid(...Object.values(ORDER_STATUS))
    .required(),
});
