import joi from 'joi';
import objectId from 'joi-objectid';

joi.objectId = objectId(joi);

export const cartSchema = joi.object({
  product: joi.objectId().required(),
  quantity: joi.number().integer().default(1),
});

export const cartByIdSchema = joi.object({
  id: joi.objectId().required(),
});

export const updateCartSchema = joi.object({
  quantity: joi.number().integer().required(),
  id: joi.objectId().required(),
});
