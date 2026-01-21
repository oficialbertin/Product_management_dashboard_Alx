const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    description: {
      type: String,
      default: '',
      maxlength: 255,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    unit: {
      type: String,
      default: 'pcs',
      enum: ['pcs', 'kgs', 'liters', 'grams', 'boxes', 'bags', 'bottles'],
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'archived'],
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt
  }
);

// Convert _id to id and remove _id and __v in JSON
productSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
