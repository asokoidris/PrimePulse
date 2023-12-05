import joi from 'joi';
import objectId from 'joi-objectid';

joi.objectId = objectId(joi);

const categorySchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
});

const updateCategorySchema = joi.object({
  name: joi.string(),
  description: joi.string(),
  category_id: joi.objectId().required(),
});

const createSubcategorySchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  categoryId: joi.objectId().required(),
});

const getCategoryByIdSchema = joi.object({
  category_id: joi.objectId().required(),
});

const getSubCategoryByIdSchema = joi.object({
  subcategory_id: joi.objectId().required(),
});

const updateSubCategorySchema = joi.object({
  subcategory_id: joi.objectId().required(),
  name: joi.string(),
  description: joi.string(),
  categoryId: joi.objectId(),
});

export {
  categorySchema,
  createSubcategorySchema,
  updateCategorySchema,
  getCategoryByIdSchema,
  updateSubCategorySchema,
  getSubCategoryByIdSchema,
};
