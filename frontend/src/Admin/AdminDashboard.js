import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2 } from 'react-feather';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    inStock: true,
    category: 'Mobiles',
    productImage: null,
    brandImage: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  // Handle adding or editing product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('brand', formData.brand);
    payload.append('description', formData.description);
    payload.append('price', formData.price);
    payload.append('category', formData.category);
    payload.append('inStock', formData.inStock);
    if (formData.productImage) payload.append('productImage', formData.productImage);
    if (formData.brandImage) payload.append('brandImage', formData.brandImage);

    try {
      if (editingProduct) {
        await axios.put(
          `http://localhost:5000/api/products/${editingProduct._id}`,
          payload,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        alert('Product updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/products', payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Product added successfully');
      }
      fetchProducts();
      resetForm();
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  // Handle product edit
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: product.price,
      inStock: product.inStock,
      category: product.category,
      productImage: null,
      brandImage: null,
    });
  };

  // Handle product deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        alert('Product deleted successfully');
        fetchProducts();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  // Reset the form
  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      description: '',
      price: '',
      inStock: true,
      category: 'Mobiles',
      productImage: null,
      brandImage: null,
    });
    setEditingProduct(null);
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
          />
          In Stock
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="Mobiles">Mobiles</option>
          <option value="Earpods">Earpods</option>
          <option value="Holders">Holders</option>
          <option value="Pendrives">Pendrives</option>
          <option value="Laptop">Laptop</option>
          <option value="Watch">Watch</option>
          <option value="Camera">Camera</option>
          <option value="Speakers">Speakers</option>
        </select>
        <label>
          Product Image
          <input
            type="file"
            name="productImage"
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>
        <label>
          Brand Image
          <input
            type="file"
            name="brandImage"
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>
        <button type="submit">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <h3>Product List</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Brand</th>
            <th>Price</th>
            <th>In Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>₹{product.price}</td>
              <td>{product.inStock ? 'In Stock' : 'Out of Stock'}</td>
              <td>{product.category}</td>
              <td>
                <button onClick={() => handleEdit(product)}>
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(product._id)}>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
