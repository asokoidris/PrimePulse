import mongoose from 'mongoose';
import { COMPANY_STATUS } from '../utils/constant/options.js';
import mongoosePaginate from 'mongoose-paginate-v2';

const companySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    businessName: {
      type: String,
      required: true,
      unique: true,
    },
    businessEmail: {
      type: String,
      required: true,
    },
    businessPhone: {
      type: String,
      required: true,
    },
    businessDescription: {
      type: String,
      required: true,
    },
    businessAddress: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
      },
    ],
    bankDetails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bank',
      },
    ],
    // NOTE: commented out because we don't have a media model yet
    // logoUrl: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Media',
    // },
    // images: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Media',
    //   },
    // ],
    tinNo: {
      type: String,
    },
    website: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(COMPANY_STATUS),
      default: COMPANY_STATUS.ACTIVE,
    },
  },
  { timestamps: true }
);

companySchema.plugin(mongoosePaginate);
const CompanyModel = mongoose.model('Company', companySchema);

export default CompanyModel;
