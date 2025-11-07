import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Product.css';

const Product = () => {
  const [allProducts, setAllProducts] = useState([]); // Holds all fetched products
  const [products, setProducts] = useState([]);       // Holds filtered products
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [popupMessage, setPopupMessage] = useState('');
  const [wishlistIds, setWishlistIds] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'http://localhost:5000/api/products';
        if (categoryFilter !== 'All') url += `?category=${categoryFilter}`;
        const res = await axios.get(url);
        setAllProducts(res.data); // Store all fetched products
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();

    const storedWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    setWishlistIds(storedWishlist.map(item => item._id));
  }, [categoryFilter]);

  useEffect(() => {
    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery)
    );
    setProducts(filtered);
  }, [searchQuery, allProducts]);

  const showPopup = (msg) => {
    setPopupMessage(msg);
    setTimeout(() => setPopupMessage(''), 2000);
  };

  const handleAddToCart = async (product) => {
    try {
      // First send to backend
      const response = await axios.post('http://localhost:5000/api/cart/add', {
        name: product.name,
        price: product.price,
        image: product.productImageUrl, // As per your backend field
        quantity: 1,
      });

      if (response.status === 201) {
        showPopup('Item added to cart successfully!');

        // Also update localStorage
        const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCart = [...existingCart, { ...product, quantity: 1, image: `http://localhost:5000/${product.productImageUrl}` }];
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      showPopup('Failed to add item to cart.');
    }
  };

  const handleBuyNow = (product) => {
    const productToBuy = { ...product, quantity: 1, image: `http://localhost:5000/${product.productImageUrl}` };
    navigate('/buy', { state: productToBuy });
  };

  const toggleWishlist = (product) => {
    let existingWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    const isInWishlist = wishlistIds.includes(product._id);

    if (isInWishlist) {
      existingWishlist = existingWishlist.filter(item => item._id !== product._id);
      setWishlistIds(prev => prev.filter(id => id !== product._id));
      showPopup(`${product.name} removed from favorites`);
    } else {
      existingWishlist.push({ ...product, quantity: 1, image: `http://localhost:5000/${product.productImageUrl}` });
      setWishlistIds(prev => [...prev, product._id]);
      showPopup(`${product.name} added to favorites`);
    }

    localStorage.setItem('wishlistItems', JSON.stringify(existingWishlist));
  };

  return (
    <div className="product-page">
      {popupMessage && <div className="popup-msg">{popupMessage}</div>}

      <div className="category-filter">
        {['All', 'Mobiles', 'Earpods', 'Holders', 'Pendrives', 'Watches', 'Laptops', 'Cameras', 'Speakers'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={categoryFilter === cat ? 'active-category' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="wishlist-icon" onClick={() => toggleWishlist(product)}>
                {wishlistIds.includes(product._id) ? '❤️' : '♡'}
              </div>
              <img src={`http://localhost:5000/${product.productImageUrl}`} alt={product.name} width={200} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>₹{product.price}</p>
              <p>{product.inStock ? "In Stock" : "Out of Stock"}</p>
              <p>Category: {product.category}</p>
              <div className="button-group">
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                <button onClick={() => handleBuyNow(product)}>Buy Now</button>
              </div>
            </div>
          ))
        ) : (
          <p className='noproduct'>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Product;
