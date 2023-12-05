import mongoose from 'mongoose';
import { CATEGORY_OR_SUBCATEGORY_STATUS } from '../utils/constant/options.js';
import mongoosePaginate from 'mongoose-paginate-v2';

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
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

SubCategorySchema.plugin(mongoosePaginate);
const SubCategoryModel = mongoose.model('SubCategory', SubCategorySchema);

export default SubCategoryModel;
