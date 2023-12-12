import joi from 'joi';
import objectId from 'joi-objectid';
import { PRODUCT_STATUS } from '../../utils/constant/options';

joi.objectId = objectId(joi);

export const productSchema = joi.object({
  company: joi.string().required(),
  name: joi.string().required(),
  description: joi.string().required(),
  categoryId: joi.string().required(),
  subcategoryId: joi.string().required(),
  price: joi.number().min(0),
  productSpecification: joi
    .object({
      sku: joi.string().required(),
      model: joi.string(),
      weight: joi.number().required(),
      color: joi.string().required(),
      size: joi.string().required(),
      material: joi.string(),
    })
    .required(),
  status: joi
    .string()
    .valid(...Object.values(PRODUCT_STATUS))
    .default(PRODUCT_STATUS.ACTIVE),
  mainImage: joi.string().required(),
  images: joi.array().items(joi.string()),
});

export const updateProductSchema = joi.object({
  id: joi.objectId().required(),
  company: joi.objectId(),
  name: joi.string(),
  description: joi.string(),
  categoryId: joi.objectId(),
  subcategoryId: joi.objectId(),
  price: joi.number().min(0),
  productSpecification: joi.object({
    sku: joi.string(),
    model: joi.string(),
    weight: joi.number(),
    color: joi.string(),
    size: joi.string(),
    material: joi.string(),
  }),
});
export const productByIdSchema = joi.object({
  id: joi.objectId().required(),
});
