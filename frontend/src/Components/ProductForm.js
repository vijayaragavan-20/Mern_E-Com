import { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '', price: '', image: '', category: '', description: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/products', product)
      .then(res => {
        alert('Product added!');
        setProduct({ name: '', price: '', image: '', category: '', description: '' });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={product.name} onChange={handleChange} placeholder="Name" />
      <input name="price" value={product.price} onChange={handleChange} placeholder="Price" />
      <input name="image" value={product.image} onChange={handleChange} placeholder="Image URL" />
      <input name="category" value={product.category} onChange={handleChange} placeholder="Category" />
      <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
