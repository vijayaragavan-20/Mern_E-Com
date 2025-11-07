const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    required: true,
  },
  productImageUrl: {
    type: String,
    required: true,
  },
  brandImageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
