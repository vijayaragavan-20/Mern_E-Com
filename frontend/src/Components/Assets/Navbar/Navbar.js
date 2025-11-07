import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaPhone,
  FaClipboardList,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setIsMenuOpen(false); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar-3d">
      <div className="logo-3d">
        <Link to="/" onClick={closeMenu}>Ease<span>Shop</span></Link>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`nav-links-3d ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/products" onClick={closeMenu}>Products</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
      </ul>

      <div className={`search-box-3d ${isMenuOpen ? 'active' : ''}`}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>

      <div className={`icons-3d ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/orders" onClick={closeMenu}>My Orders<FaClipboardList /></Link>
        <Link to="/wishlist" onClick={closeMenu}>Fav<FaHeart /></Link>
        <Link to="/cart" onClick={closeMenu}>Cart<FaShoppingCart /></Link>
        <Link to="/login" onClick={closeMenu}>Login<FaUser /></Link>
        <Link to="/support" onClick={closeMenu}>Support<FaPhone /></Link>
      </div>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem('user');
          window.location.href = '/login';
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
