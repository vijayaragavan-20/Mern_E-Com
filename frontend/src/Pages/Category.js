import React from 'react';
import { Link } from 'react-router-dom';

const categories = ['phone', 'laptop', 'camera'];

const Category = () => (
  <div>
    <h1>Select Category</h1>
    <ul>
      {categories.map(cat => (
        <li key={cat}>
          <Link to={`/category/${cat}`}>{cat.toUpperCase()}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Category;
