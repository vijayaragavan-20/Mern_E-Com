import React, { useEffect, useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Get saved orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  const handleCancelOrder = (orderId) => {
    // Filter out the order with the given orderId
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);

    // Update localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    alert('Order canceled successfully!');
  };

  const handleCancelProduct = (orderId, productIndex) => {
    // Update the specific order by removing the product at productIndex
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        const updatedItems = order.items.filter((_, idx) => idx !== productIndex);
        return { ...order, items: updatedItems }; // create a new order object
      }
      return order;
    }).filter(order => order.items.length > 0); // Remove orders if no items left

    setOrders(updatedOrders);

    // Update localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    alert('Product canceled successfully!');
  };

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>Order ID: #{order.id}</h3>
            <p>Date: {order.date}</p>
            <p>Total: ₹{order.total.toLocaleString()}</p>
            
            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ₹{item.price.toLocaleString()}</p>
                  </div>
                  <button
                    className="cancel-product-btn"
                    onClick={() => handleCancelProduct(order.id, idx)}
                  >
                    Cancel Product
                  </button>
                </div>
              ))}
            </div>

            {/* <button
              className="cancel-order-btn"
              onClick={() => handleCancelOrder(order.id)}
            >
              Cancel Order
            </button> */}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
