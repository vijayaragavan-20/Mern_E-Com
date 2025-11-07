import React from 'react';
import './Popular.css';
import i5 from '../Assets/iphone13-removebg-preview.png';

const phones = [
  {
    id: 1,
    name: 'iPhone 13',
    price: '₹69,999',
    Details: 'NEW LAUNCH 2025',
    image: i5,
  },
];

const Popular = () => {
  const handleAddToCart = (product) => {
    // Get current cart items or empty array
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Push new item with default quantity = 1
    cartItems.push({ ...product, quantity: 1 });

    // Save back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Alert
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="popular-container">
      <h2 className="main-title">New iPhone</h2>
      <div className="phone-showcase">
        <span className="details-tag">{phones[0].Details}</span>
        <img src={phones[0].image} alt={phones[0].name} />
        <h3>{phones[0].name}</h3>
        <p className="price">{phones[0].price}</p>
        <button className="btn visit" onClick={() => handleAddToCart(phones[0])}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Popular;
