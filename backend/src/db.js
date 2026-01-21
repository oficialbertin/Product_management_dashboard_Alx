const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  const mongoUri =
    process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/product_dashboard';

  try {
    await mongoose.connect(mongoUri);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = { connectDB };

