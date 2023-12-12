import joi from 'joi';
import objectId from 'joi-objectid';

joi.objectId = objectId(joi);

export const companySchema = joi.object({
  businessName: joi.string().required(),
  businessEmail: joi.string().email().required(),
  businessPhone: joi.string().required(),
  businessDescription: joi.string().required(),
  businessAddress: joi.array().items(joi.string().required()),
  bankDetails: joi.array().items(joi.string().required()),
  tinNo: joi.string(),
  website: joi.string().uri().required(),
});

export const updateCompanySchema = joi.object({
  id: joi.objectId().required(),
  businessName: joi.string(),
  businessEmail: joi.string().email(),
  businessPhone: joi.string(),
  businessDescription: joi.string(),
  businessAddress: joi.array().items(joi.string()),
  bankDetails: joi.array().items(joi.string()),
  tinNo: joi.string(),
  website: joi.string().uri(),
});

export const companyByIdSchema = joi.object({
  id: joi.objectId().required(),
});
