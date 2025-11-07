const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes'); 
const cartRoutes = require('./routes/cartRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/eshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
