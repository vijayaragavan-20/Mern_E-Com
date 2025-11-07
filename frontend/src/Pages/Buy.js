import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Buy.css';

const BuyNow = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    if (state?.cartItems && state?.totalAmount) {
      setCartItems(state.cartItems);
      setTotalAmount(state.totalAmount);
    } else if (state) {
      const price = typeof state.price === 'string'
        ? parseFloat(state.price.replace(/[^0-9.]/g, ''))
        : state.price;

      setCartItems([{ ...state, quantity: 1 }]);
      setTotalAmount(price);
    } else {
      alert('No product selected. Redirecting to homepage.');
      navigate('/');
    }
  }, [state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address || !mobileNumber || !paymentMethod) {
      alert('Please fill all the details.');
      return;
    }

    try {
      const orderData = {
        address,
        mobileNumber,
        paymentMethod,
        totalAmount,
        items: cartItems.map(item => ({
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      const response = await axios.post('http://localhost:5000/api/orders/place', orderData);

      if (response.status === 201) {
        alert('🎉 Order successfully placed!');

        // Save to localStorage for Orders page
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

        const newOrder = {
          id: Date.now(), // simple unique ID
          date: new Date().toLocaleString(),
          total: totalAmount,
          address,
          mobileNumber,
          paymentMethod,
          items: cartItems,
        };

        const updatedOrders = [...existingOrders, newOrder];
        localStorage.setItem('orders', JSON.stringify(updatedOrders));

        // Navigate to confirmation page with order data
        navigate('/OrderConfirmation', { state: { order: newOrder } });
      }
    } catch (error) {
      console.error(error);
      alert('Failed to place the order. Please try again.');
    }
  };

  return (
    <div className="buy-now-page" style={{ padding: '20px' }}>
      <h2>Checkout</h2>

      {cartItems.length > 0 ? (
        <>
          <div className="cart-summary">
            <h3>Cart Items</h3>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} style={{ marginBottom: '10px', listStyle: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                    <div>
                      <h4>{item.name}</h4>
                      <p>Price: ₹{item.price}</p>
                      <p>Qty: {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-summary" style={{ marginTop: '20px' }}>
            <h3>Price Details</h3>
            <p>Total Price: ₹{totalAmount}</p>
          </div>

          <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="address">Shipping Address:</label><br />
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full address"
                required
                style={{ width: '100%', height: '60px' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="mobile">Mobile Number:</label><br />
              <input
                type="text"
                id="mobile"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter your mobile number"
                required
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="payment">Payment Method:</label><br />
              <select
                id="payment"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
                style={{ width: '100%' }}
              >
                <option value="">Select Payment Method</option>
                <option value="CreditCard">Credit Card</option>
                <option value="DebitCard">Debit Card</option>
                <option value="NetBanking">Net Banking</option>
                <option value="CashOnDelivery">Cash On Delivery</option>
              </select>
            </div>

            <button type="submit" className="buy-now-btn" style={{ padding: '10px 20px' }}>
              Place Order
            </button>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BuyNow;
