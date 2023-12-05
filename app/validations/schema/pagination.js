import joi from 'joi';
import objectId from 'joi-objectid';

joi.objectId = objectId(joi);

export const paginationSchema = joi.object({
  page: joi.number().min(1).default(1),
  limit: joi.number().min(1).default(20),
});
