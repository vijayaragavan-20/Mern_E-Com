import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Newcollections.css';

import product1 from '../Assets/product1.png';
import product2 from '../Assets/product2.png';
import product3 from '../Assets/product3.png';
import product4 from '../Assets/product-4.png';
import product5 from '../Assets/product5.png';
import product6 from '../Assets/product6.png';
import product7 from '../Assets/product7.png';
import product8 from '../Assets/product8.png';
import product9 from '../Assets/hp_laptop-.png';
import product10 from '../Assets/Sony_Headphones___Earbuds-removebg-preview.png';
import product11 from '../Assets/product11.png';
import product12 from '../Assets/product12.png';
import product13 from '../Assets/img1.png';
import product14 from '../Assets/img2.png';
import product15 from '../Assets/img4.png';
import product16 from '../Assets/img6.png';

const products = [
  { id: 1, name: 'Wireless Headphones', price: '$89', image: product1 },
  { id: 2, name: 'AirPods', price: '$149', image: product2 },
  { id: 3, name: 'Linux Camera', price: '$59', image: product3 },
  { id: 4, name: 'Smart Watch', price: '$39', image: product4 },
  { id: 5, name: '4k Speaker', price: '$99', image: product5 },
  { id: 6, name: 'Android', price: '$329', image: product6 },
  { id: 7, name: 'Earpods', price: '$19', image: product7 },
  { id: 8, name: 'Linux Laptop', price: '$199', image: product8 },
  { id: 9, name: 'HP Laptop', price: '$899', image: product9 },
  { id: 10, name: 'Sony Earbuds', price: '$129', image: product10 },
  { id: 11, name: 'Sony Pendrive', price: '$129', image: product11 },
  { id: 12, name: 'PNY', price: '$129', image: product12 },
  { id: 13, name: 'PNY', price: '$129', image: product13 },
  { id: 14, name: 'PNY', price: '$129', image: product14 },
  { id: 15, name: 'PNY', price: '$129', image: product15 },
  { id: 16, name: 'PNY', price: '$129', image: product16 },
];

const NewCollections = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    setWishlistItems(savedWishlist);
  }, []);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCart = [...existingCart, { ...product, quantity: 1 }];
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    alert(`${product.name} added to Cart`);
  };

  const handleBuyNow = (product) => {
    const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));
    navigate('/Buy', {
      state: {
        cartItems: [{ ...product, quantity: 1 }],
        totalAmount: numericPrice,
      },
    });
  };

  const handleToggleWishlist = (product) => {
    const existingWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    const isAlreadyInWishlist = existingWishlist.some(item => item.id === product.id);

    let updatedWishlist;

    if (isAlreadyInWishlist) {
      updatedWishlist = existingWishlist.filter(item => item.id !== product.id);
      alert(`${product.name} removed from Favourites 🤍`);
    } else {
      updatedWishlist = [...existingWishlist, product];
      alert(`${product.name} added to Favourites ❤️`);
    }

    localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
    setWishlistItems(updatedWishlist);
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <div className="new-collections">
      <h2>NEW COLLECTIONS</h2>
      <div className="collection-grid">
        {products.map((product) => (
          <div className="collection-card" key={product.id}>
            <div
              className="wishlist-icon"
              onClick={() => handleToggleWishlist(product)}
              style={{
                color: isInWishlist(product.id) ? 'red' : 'black',
                cursor: 'pointer',
                fontSize: '20px',
              }}
            >
              {isInWishlist(product.id) ? '❤️' : '🤍'}
            </div>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <div className="collection-actions">
              <button className="btn-cart" onClick={() => handleAddToCart(product)}>🛒 Add to Cart</button>
              <button className="btn-buy" onClick={() => handleBuyNow(product)}>⚡ Buy Now</button>
            </div>
            <div className="rating">★★★★☆</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
