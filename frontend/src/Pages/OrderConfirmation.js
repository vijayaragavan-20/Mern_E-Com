import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import confetti from 'canvas-confetti';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    myConfetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });
  }, []);

  const handleContinueShopping = () => {
    navigate('/'); // Redirect to the homepage
  };

  const handleViewOrders = () => {
    navigate('/Orders'); // Redirect to the orders page
  };

  return (
    <div className="order-confirmation-wrapper">
      {/* Canvas for confetti */}
      <canvas ref={canvasRef} className="confetti-canvas"></canvas>

      <div className="order-confirmation">
        <div className="success-icon">✅</div>
        <h2>Thank you for your order!</h2>
        <p>Your order has been placed successfully and is now being processed.</p>
        <div className="order-buttons">
          <button onClick={handleContinueShopping}>Continue Shopping</button>
          <button onClick={handleViewOrders}>View My Orders</button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
