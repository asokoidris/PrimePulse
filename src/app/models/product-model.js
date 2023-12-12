import mongoose from 'mongoose';
import { PRODUCT_STATUS } from '../utils/constant/options';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Product must have an owner'],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: [true, 'Product must have a company'],
    },
    name: {
      type: String,
      required: [true, 'Product must have a name'],
    },
    description: {
      type: String,
      required: [true, 'Product must have a description'],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    productSpecification: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductSpecification',
    },
    status: {
      type: String,
      enum: Object.values(PRODUCT_STATUS),
      default: PRODUCT_STATUS.ACTIVE,
    },
    mainImage: {
      type: String,
      required: [true, 'Product must have a main image'],
    },

    images: [{ type: String }],
  },
  { timestamps: true }
);

productSchema.plugin(mongoosePaginate);
const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
