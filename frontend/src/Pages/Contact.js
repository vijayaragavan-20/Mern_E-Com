import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log(formData);
  };

  return (
    <div className="contact-container">
      <h2 className="contact-heading">📬 Get in Touch with Us</h2>

      <div className="contact-content">
        <div className="form-section">
          {isSubmitted ? (
            <div className="thank-you-message">
              <h3>🎉 Thank you for reaching out! We'll get back to you soon.</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <button type="submit" className="submit-btn">📨 Send Message</button>
              </div>
            </form>
          )}
        </div>

        <div className="info-section">
          <h3>📌 Contact Information</h3>
          <p>
            📞 Phone: <a href="tel:9384217682" className="contact-link">9384217682</a>
          </p>
          <p>
            📧 Email: <a href="mailto:vijayragavan572@gmail.com" className="contact-link">
              vijayragavan572@gmail.com
            </a>
          </p>
          <p>📍 Address: Saravanampatti, Coimbatore</p>

          <div className="social-media">
            <h4>🌐 Follow Us</h4>
            <a href="https://facebook.com/bharath bharath" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com/@Bharath74057779" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com/itz_bhara_th" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
