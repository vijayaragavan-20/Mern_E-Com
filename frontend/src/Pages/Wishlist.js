import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    const updatedItems = items.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setWishlistItems(updatedItems);
  }, []);

  const handleRemove = (productId) => {
    const updatedItems = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedItems);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedItems));
    alert('Item removed from wishlist ❌');
  };

  const handleQuantityChange = (index, delta) => {
    const updatedItems = [...wishlistItems];
    updatedItems[index].quantity = Math.max(1, updatedItems[index].quantity + delta);
    setWishlistItems(updatedItems);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedItems));
  };

  const handleBuyNow = (product) => {
    navigate('/buy', { state: product });
  };

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

    return (
      <>
        {'★'.repeat(filledStars)}
        {halfStar && '½'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-header-bar">
        <h2>Your Favourites ❤️</h2>
      </div>
      {wishlistItems.length === 0 ? (
        <p className="empty-text">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-container">
          {wishlistItems.map((item, index) => (
            <div key={index} className="wishlist-card">
              <div className="wishlist-top">
                {/* Heart icon for removal only */}
                <div
                  className="wishlist-icon"
                  onClick={() => handleRemove(item.id)}
                >
                  ❤️
                </div>
                <img src={item.image} alt={item.name} />
              </div>
              <h4>{item.name}</h4>
              <p className="wishlist-price">{item.price}</p>

              <div className="product-rating">{renderStars(item.rating || 4.5)}</div>

              {/* Quantity Controls */}
              <div className="wishlist-quantity">
                <button onClick={() => handleQuantityChange(index, -1)} disabled={item.quantity === 1}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(index, 1)}>+</button>
              </div>

              {/* Actions */}
              <div className="wishlist-actions">
                <button className="btn-buy" onClick={() => handleBuyNow(item)}>⚡ Buy Now</button>
               
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
