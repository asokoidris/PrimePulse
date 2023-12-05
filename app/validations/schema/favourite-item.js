import joi from 'joi';
import objectId from 'joi-objectid';

joi.objectId = objectId(joi);

export const favouriteItemSchema = joi.object({
  productId: joi.objectId().required(),
});

export const favouriteItemByIdSchema = joi.object({
  id: joi.objectId().required(),
});
