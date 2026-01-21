const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  const mongoUri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    'mongodb://127.0.0.1:27017/product_dashboard';

  if (!mongoUri) {
    throw new Error('Missing MongoDB connection string (set MONGODB_URI or MONGO_URI)');
  }

  try {
    await mongoose.connect(mongoUri);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = { connectDB };

