const Product = require("../models/Product");

// GET all products
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// POST add new product
const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  const saved = await newProduct.save();
  res.status(201).json(saved);
};

// PUT edit product
const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// DELETE product
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
