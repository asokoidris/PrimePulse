import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSpecificationSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
    },
    model: {
      type: String,
    },
    weight: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    material: {
      type: String,
    },
  },
  { timestamps: true }
);

ProductSpecificationSchema.plugin(mongoosePaginate);
const ProductSpecificationModel = mongoose.model(
  'ProductSpecification',
  ProductSpecificationSchema
);

export default ProductSpecificationModel;
