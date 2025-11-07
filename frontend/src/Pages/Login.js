import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PasswordInput from '../Components/PasswordInput';
import './Login.css'; // Common CSS for auth pages

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];

    const matchedUser = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem('user', JSON.stringify(matchedUser));
      localStorage.setItem('loggedInUser', matchedUser.email);
      alert(`Welcome, ${matchedUser.username}!`);
      navigate('/');
    } else {
      alert('Invalid email or password.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" className="auth-button">Login</button>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
