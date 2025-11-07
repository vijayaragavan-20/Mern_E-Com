const express = require('express');
const router = express.Router();
const CartModel = require('../models/Cart'); // 👈 correct path

// Add to cart
router.post('/add', async (req, res) => {
  try {
    const { name, price, image, quantity } = req.body;
    const newItem = new CartModel({ name, price, image, quantity });
    await newItem.save();
    res.status(201).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
});

// Get cart items
router.get('/', async (req, res) => {
  try {
    const cartItems = await CartModel.find();
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching cart items' });
  }
});

module.exports = router;
