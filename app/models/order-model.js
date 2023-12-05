import mongoose from 'mongoose';
import {
  ORDER_STATUS,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
} from '../utils/constant/options.js';
import mongoosePaginate from 'mongoose-paginate-v2';

const OrderSchema = new mongoose.Schema(
  {
    manufacturerIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
    },
    payment: {
      paymentMethod: {
        type: String,
        enum: Object.values(PAYMENT_METHOD),
        required: true,
        default: PAYMENT_METHOD.TRANSFER,
      },
      paymentId: {
        type: String,
      },
      paymentStatus: {
        type: String,
        enum: Object.values(PAYMENT_STATUS),
        default: PAYMENT_STATUS.PENDING,
      },
      paymentDate: {
        type: Date,
      },
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
  },
  { timestamps: true }
);

OrderSchema.plugin(mongoosePaginate);
const OrderModel = mongoose.model('Order', OrderSchema);

export default OrderModel;
