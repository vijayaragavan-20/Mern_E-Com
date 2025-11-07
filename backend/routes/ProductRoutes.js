const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// -------------------------
// @route   POST /api/products
// @desc    Add new product
// -------------------------
router.post(
  '/',
  upload.fields([
    { name: 'productImage', maxCount: 1 },
    { name: 'brandImage', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name, price, inStock, brand, description, category } = req.body;

      const productImage = req.files['productImage']
        ? req.files['productImage'][0].filename
        : null;
      const brandImage = req.files['brandImage']
        ? req.files['brandImage'][0].filename
        : null;

      const newProduct = new Product({
        name,
        brand,
        description,
        price,
        inStock: inStock === 'true' || inStock === true,
        category,
        productImageUrl: productImage ? `uploads/${productImage}` : '',
        brandImageUrl: brandImage ? `uploads/${brandImage}` : '',
      });

      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error saving product:', error);
      res.status(500).json({ error: 'Server Error: Could not save product' });
    }
  }
);

// -------------------------
// @route   GET /api/products
// @desc    Get all or filtered products
// -------------------------
router.get('/', async (req, res) => {
  const { category } = req.query;

  try {
    const products = category
      ? await Product.find({ category })
      : await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Server Error: Could not fetch products' });
  }
});

// -------------------------
// @route   PUT /api/products/:id
// @desc    Update a product
// -------------------------
router.put(
  '/:id',
  upload.fields([
    { name: 'productImage', maxCount: 1 },
    { name: 'brandImage', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name, price, inStock, brand, description, category } = req.body;
      const updatedFields = {
        name,
        brand,
        description,
        price,
        inStock: inStock === 'true' || inStock === true,
        category,
      };

      if (req.files['productImage']) {
        updatedFields.productImageUrl = `uploads/${req.files['productImage'][0].filename}`;
      }
      if (req.files['brandImage']) {
        updatedFields.brandImageUrl = `uploads/${req.files['brandImage'][0].filename}`;
      }

      const updated = await Product.findByIdAndUpdate(
        req.params.id,
        updatedFields,
        { new: true }
      );

      res.status(200).json(updated);
    } catch (err) {
      console.error('Update error:', err);
      res.status(500).json({ error: 'Failed to update product' });
    }
  }
);

// -------------------------
// @route   DELETE /api/products/:id
// @desc    Delete product by ID
// -------------------------
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete image files if they exist
    if (product.productImageUrl) {
      const productImgPath = path.join(__dirname, '..', product.productImageUrl);
      fs.unlink(productImgPath, (err) => {
        if (err) console.error('Error deleting product image:', err);
      });
    }

    if (product.brandImageUrl) {
      const brandImgPath = path.join(__dirname, '..', product.brandImageUrl);
      fs.unlink(brandImgPath, (err) => {
        if (err) console.error('Error deleting brand image:', err);
      });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;