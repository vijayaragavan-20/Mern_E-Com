// src/admin/components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="admin-header">
      <h3>Welcome, Admin</h3>
      <button className="logout-button">Logout</button>
    </header>
  );
};

export default Header;
