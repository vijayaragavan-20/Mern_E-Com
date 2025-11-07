import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];

    const parsedItems = items.map(item => ({
      ...item,
      price: typeof item.price === 'string'
        ? parseFloat(item.price.replace(/[^0-9.]/g, ''))
        : item.price,
      quantity: item.quantity || 1,
    }));

    setCartItems(parsedItems);
  }, []);

  const handleQuantityChange = (index, delta) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = Math.max(1, updatedItems[index].quantity + delta);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleRemoveItem = (indexToRemove) => {
    const updatedItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const formatPrice = (price) => `₹${Number(price).toLocaleString()}`;

  const handleBuyAll = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    navigate('/buy', {
      state: {
        cartItems,
        totalAmount: calculateTotal(),
      },
    });
  };

  return (
    <div className="cart-page">
      <h2 className="cart-heading">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-text">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="price">Price: {formatPrice(item.price)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(index, -1)} disabled={item.quantity === 1}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemoveItem(index)}>
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="total-price">
            <p>Total: {formatPrice(calculateTotal())}</p>
          </div>

          <div className="buy-all-container">
            <button className="buy-all-btn" onClick={handleBuyAll}>
              🛍️ Buy All Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Move handleAddToCart OUTSIDE the Cart component
export const handleAddToCart = (product) => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    alert("Please login to add to cart");
    return;
  }

  // Fetch all carts
  const allCarts = JSON.parse(localStorage.getItem('carts')) || {};

  // Get current user's cart
  const userCart = allCarts[loggedInUser] || [];

  // Add the new product
  const updatedCart = [...userCart, product];

  // Update back
  allCarts[loggedInUser] = updatedCart;
  localStorage.setItem('carts', JSON.stringify(allCarts));

  alert("Item added to cart!");
};

export default Cart;
