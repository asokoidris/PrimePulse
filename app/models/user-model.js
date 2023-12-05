import joi from 'joi';
import mongoose from 'mongoose';
import { USER_TYPES } from '../utils/constant/options.js';
import mongoosePaginate from 'mongoose-paginate-v2';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: Object.values(USER_TYPES),
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    photoUrl: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    subscribedToNewsletter: {
      type: Boolean,
      default: false,
    },
    agreeToTerm: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(mongoosePaginate);

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
