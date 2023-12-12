import mongoose from 'mongoose';
import { VERIFICATION_TYPE } from '../utils/constant/options';
import keys from '../config/keys';
import mongoosePaginate from 'mongoose-paginate-v2';

const verificationType = VERIFICATION_TYPE;

const SecretTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    code: {
      type: String,
    },
    trials: {
      type: Number,
      default: 0,
    },
    expiryTime: {
      type: Date,
      default: keys.secretToken.expiryTime,
    },
    verificationType: {
      type: String,
      enum: Object.values(verificationType),
    },
  },
  { timestamps: true }
);

SecretTokenSchema.plugin(mongoosePaginate);
export default mongoose.model('SecretToken', SecretTokenSchema);
