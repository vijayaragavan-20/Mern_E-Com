// src/admin/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebars.css';

const Sidebars = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav className="sidebar-nav">
        <Link to="/" className="sidebar-link">Dashboard</Link>
        <Link to="/products" className="sidebar-link">Products</Link>
        <Link to="/orders" className="sidebar-link">Orders</Link>
      </nav>
    </div>
  );
};

export default Sidebars;
