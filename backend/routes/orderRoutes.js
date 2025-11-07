const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Place Order API
router.post('/place', async (req, res) => {
  try {
    const { address, mobileNumber, paymentMethod, totalAmount, items } = req.body;

    const newOrder = new Order({
      address,
      mobileNumber,
      paymentMethod,
      totalAmount,
      items
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

module.exports = router;
