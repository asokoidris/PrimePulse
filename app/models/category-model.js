import mongoose from 'mongoose';
import { CATEGORY_OR_SUBCATEGORY_STATUS } from '../utils/constant/options.js';
import mongoosePaginate from 'mongoose-paginate-v2';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(CATEGORY_OR_SUBCATEGORY_STATUS),
      default: CATEGORY_OR_SUBCATEGORY_STATUS.ACTIVE,
    },
  },
  { timestamps: true }
);

CategorySchema.plugin(mongoosePaginate);
const CategoryModel = mongoose.model('Category', CategorySchema);

export default CategoryModel;
