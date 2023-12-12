import joi from 'joi';
import objectId from 'joi-objectid';

joi.objectId = objectId(joi);

export const createBankSchema = joi.object({
  bankName: joi.string().required(),
  accountNumber: joi.string().required(),
  accountName: joi.string().required(),
});

export const updateBankSchema = joi.object({
  id: joi.objectId().required(),
  bankName: joi.string(),
  accountNumber: joi.string(),
  accountName: joi.string(),
});

export const bankByIdSchema = joi.object({
  id: joi.objectId().required(),
});
