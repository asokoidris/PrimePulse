import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

cartSchema.plugin(mongoosePaginate);
const CartModel = mongoose.model('cart', cartSchema);

export default CartModel;
