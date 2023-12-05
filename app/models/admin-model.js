import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ADMIN_TYPES } from '../utils/constant/options.js';

const AdminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: [
      {
        type: String,
        enum: Object.values(ADMIN_TYPES),
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    createdBySuperAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

AdminSchema.plugin(mongoosePaginate);

const AdminModel = mongoose.model('Admin', AdminSchema);

export default AdminModel;
