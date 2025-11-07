import React from 'react';
import './Footer.css';
import logo from '../Assets/pc.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-middle">
        <img src={logo} alt="Shooper Logo" className="footer-logo" />
      </div>

      <div className="footer-links">
        <ul>
          <li><a href="/products">Products</a></li>
          <li><a href="https://facebook.com">Facebook</a></li>
          <li><a href="https://instagram.com">Instagram</a></li>
          <li><a href="https://twitter.com">Twitter</a></li>
          <li><a href="/support">Help Center</a></li>
        </ul>
      </div>

      <div className="footer-bottom">
        <p>© 2025 EaseShop. All Rights Reserved. Terms · Privacy · vijayragavan</p>
      </div>
    </footer>
  );
};

export default Footer;
