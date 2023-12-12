import dotenv from 'dotenv';
import mongoose from 'mongoose';
import keys from './keys';

dotenv.config();

const connectionString =
  keys.database.mongoDb[keys.environment].connectionString;

const MongoConnection = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to MongoDB!');
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
  }
};

export default MongoConnection;
