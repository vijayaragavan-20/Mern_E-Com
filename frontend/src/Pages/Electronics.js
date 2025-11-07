import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Apple iPhone 14 Pro',
    description: '6.1-inch Super Retina XDR display with ProMotion, A16 Bionic chip, 128GB Storage',
    price: 119999,
    image: '/phone.png',
    category: 'mobile' // Add category for routing
  },
  {
    id: 2,
    name: 'Samsung Galaxy S21',
    description: '6.2-inch Dynamic AMOLED display, Exynos 2100, 128GB Storage',
    price: 79999,
    image: '/apple-watch.png',
    category: 'mobile'
  },
  {
    id: 3,
    name: 'Sony WH-1000XM4',
    description: 'Wireless Noise Cancelling Headphones',
    price: 29999,
    image: '/upright-loudspeaker.jpg',
    category: 'accessory'
  },
  {
    id: 4,
    name: 'Dell XPS 13',
    description: '13.4-inch FHD display, Intel Core i7, 16GB RAM',
    price: 139999,
    image: '/img4.png',
    category: 'laptop'
  },
  {
    id: 5,
    name: 'Apple Watch Series 7',
    description: 'Always-On Retina display, GPS, 32GB Storage',
    price: 42900,
    image: '/hp_laptop-.png',
    category: 'accessory'
  },
  // ... other products
];

const ElectronicsItems = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleVisit = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div>
      <h1>Electronics Items</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredProducts.map(product => (
          <div key={product.id} style={{ margin: '20px', border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            <p>{product.description}</p>
            <p>₹{product.price.toLocaleString()}</p>
            {product.category === 'mobile' && (
              <button style={{ marginTop: '10px' }} onClick={() => handleVisit('mobile')}>
                Visit Mobiles
              </button>
            )}
            {product.category === 'laptop' && (
              <button style={{ marginTop: '10px' }} onClick={() => handleVisit('laptop')}>
                Visit Laptops
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div>
          <h2>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {products.filter(product => product.category === selectedCategory).map(product => (
              <div key={product.id} style={{ margin: '20px', border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                <h2>{product.name}</h2>
                <img src={product.image} alt={product.name} style={{ width: '100%' }} />
                <p>{product.description}</p>
                <p>₹{product.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectronicsItems;