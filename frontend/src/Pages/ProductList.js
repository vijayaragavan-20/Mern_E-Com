// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './product.css';

// const ProductList = () => {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedProducts = JSON.parse(localStorage.getItem('productItems')) || [];
//     setFilteredProducts(storedProducts);
//   }, []);

//   useEffect(() => {
//     const syncProducts = () => {
//       const updated = JSON.parse(localStorage.getItem('productItems')) || [];
//       setFilteredProducts(updated);
//     };

//     window.addEventListener('storage', syncProducts);
//     return () => window.removeEventListener('storage', syncProducts);
//   }, []);

//   // other wishlist/cart/buy logic remains the same...

//   const handleCategoryChange = (category) => {
//     const allProducts = JSON.parse(localStorage.getItem('productItems')) || [];
//     if (category === 'all') {
//       setFilteredProducts(allProducts);
//     } else {
//       const filtered = allProducts.filter(product => product.category === category);
//       setFilteredProducts(filtered);
//     }
//   };

//   // UI rendering same as before...
// };
 
// export default ProductList;
