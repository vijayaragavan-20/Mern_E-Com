import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PasswordInput from '../Components/PasswordInput';
import './Register.css'; // Common CSS for auth pages

const RegisterPage = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!user.username || !user.email || !user.password) {
      alert("Please fill all fields.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const emailExists = existingUsers.some(u => u.email === user.email);

    if (emailExists) {
      alert('Email already registered. Please login.');
      navigate('/login');
      return;
    }

    const updatedUsers = [...existingUsers, user];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    alert(`Registration Successful!\nUsername: ${user.username}`);
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <PasswordInput
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button type="submit" className="auth-button">Register</button>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
