import mongoose from 'mongoose';
import { ADDRESS_STATUS } from '../utils/constant/options.js';
import mongoosePaginate from 'mongoose-paginate-v2';

const AddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(ADDRESS_STATUS),
      default: ADDRESS_STATUS.ACTIVE,
    },
  },
  { timestamps: true }
);

AddressSchema.plugin(mongoosePaginate);

const AddressModel = mongoose.model('Address', AddressSchema);

export default AddressModel;
