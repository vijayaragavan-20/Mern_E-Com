import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      // TODO: Send the email to your backend or newsletter API
      console.log("Subscribed email:", email);

      setSuccessMsg("Thanks for subscribing! You'll receive daily product updates.");
      setEmail('');

      // Hide the popup after 3 seconds
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      alert("Please enter a valid email.");
    }
  };

  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our ElectroShop and stay updated</p>

      <div className="newsletter-input-group">
        <input
          type='email'
          placeholder='Your Email Id'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>

      {successMsg && <div className="newsletter-popup">{successMsg}</div>}
    </div>
  );
};

export default Newsletter;
