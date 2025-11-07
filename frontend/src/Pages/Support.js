import React, { useState } from 'react';
import './Support.css';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issue: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Support Request:', formData);
  };

  return (
    <div className="support-container">
      <h2 className="support-title">Need Help? We're Here for You!</h2>

      <div className="support-options">
        {/* Phone */}
        <div className="support-card">
          <i className="fas fa-phone-alt support-icon"></i>
          <h4>Call Us</h4>
          <a href="tel:+919384217682" className="support-link">+91 9384217682</a>
        </div>

        {/* Email */}
        <div className="support-card">
          <i className="fas fa-envelope support-icon"></i>
          <h4>Email</h4>
          <a href="mailto:support@yourstore.com" className="support-link">vijayragavan572@gmail.com</a>
        </div>

        {/* Live Chat */}
        <div className="support-card">
          <i className="fas fa-comments support-icon"></i>
          <h4>Live Chat</h4>
          <p className="support-text">Available 24/7</p>
          <a href="https://chat.yourstore.com" className="support-link" target="_blank" rel="noopener noreferrer">Start Live Chat</a>
        </div>
      </div>

      <div className="support-form-section">
        <h3>Submit a Support Request</h3>
        {submitted ? (
          <div className="support-success">
            🎉 Thanks for reaching out! We'll respond shortly.
          </div>
        ) : (
          <form className="support-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <select
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              required
            >
              <option value="">Select Issue</option>
              <option value="delivery">Delivery Delay</option>
              <option value="payment">Payment Failed</option>
              <option value="account">Account/Login Problem</option>
              <option value="other">Other</option>
            </select>
            <textarea
              name="message"
              placeholder="Please describe your issue in detail..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="support-submit-btn">
              Send Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Support;
