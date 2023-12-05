import mongoose from 'mongoose';
import { BANK_STATUS } from '../utils/constant/options.js';
import mongoosePaginate from 'mongoose-paginate-v2';
const BankSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(BANK_STATUS),
      default: BANK_STATUS.ACTIVE,
    },
  },
  { timestamps: true }
);

BankSchema.plugin(mongoosePaginate);
const BankModel = mongoose.model('Bank', BankSchema);

export default BankModel;
