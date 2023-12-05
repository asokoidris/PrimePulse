import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const favoriteItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

favoriteItemSchema.plugin(mongoosePaginate);
const FavoriteItemModel = mongoose.model('favoriteItem', favoriteItemSchema);

export default FavoriteItemModel;
