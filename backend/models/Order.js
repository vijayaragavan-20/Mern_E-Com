const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  address: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    }
  ],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
