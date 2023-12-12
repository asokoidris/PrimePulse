import joi from 'joi';
import objectId from 'joi-objectid';

joi.objectId = objectId(joi);

export const createAddressSchema = joi.object({
  address: joi.string().required(),
  city: joi.string().required(),
  state: joi.string().required(),
  country: joi.string().required(),
  zipCode: joi.string(),
});

export const updateAddressSchema = joi.object({
  id: joi.objectId().required(),
  address: joi.string(),
  city: joi.string(),
  state: joi.string(),
  country: joi.string(),
  zipCode: joi.string(),
});

export const addressByIdSchema = joi.object({
  id: joi.objectId().required(),
});
