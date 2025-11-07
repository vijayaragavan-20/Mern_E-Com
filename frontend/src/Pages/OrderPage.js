import React, { useState } from 'react';

// Function to save the order to localStorage
const saveOrder = (order) => {
  // Retrieve existing orders from localStorage
  const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

  // Add the new order to the existing orders
  existingOrders.push(order);

  // Save the updated list of orders back to localStorage
  localStorage.setItem('orders', JSON.stringify(existingOrders));
};

const OrderPage = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Handle placing the order
  const handlePlaceOrder = () => {
    // Collecting all order details (this could come from a form or state)
    const order = {
      id: (Math.random() * 100000).toString(), // Unique ID (you can generate this differently)
      date: new Date().toLocaleDateString(),
      total: 1000, // Total price (this could be dynamically calculated)
      items: [
        {
          name: 'Product 1',  // Replace with the actual product name
          image: 'path_to_image',  // Replace with the actual product image path or URL
          price: 500,
          quantity: 2
        }
      ]
    };

    // Save the order to localStorage
    saveOrder(order);

    // Update state to show confirmation
    setOrderPlaced(true);

    // Optionally, redirect to the orders page
    // Example: navigate('/orders');
  };

  return (
    <div>
      <h2>Place Order</h2>
      <button onClick={handlePlaceOrder}>Place Order</button>

      {orderPlaced && <p>Order placed successfully!</p>}
    </div>
  );
};

export default OrderPage;
