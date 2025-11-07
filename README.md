# E-Commerce Application

A full-stack e-commerce application with product catalog, shopping cart, order management, and admin dashboard.

## Features

- **Product Catalog**: Browse products by category
- **User Authentication**: Register and login functionality
- **Shopping Cart**: Add, remove, and update items
- **Wishlist**: Save products for later
- **Order Management**: Place orders and view order history
- **Admin Dashboard**: Manage products, orders, and users
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

### Frontend
- React 19.1.0
- React Router 7.5.0
- Axios for API requests
- React Icons and Lucide React for UI components
- CSS for styling

### Backend
- Node.js with Express 5.1.0
- MongoDB with Mongoose 8.13.2
- Multer for file uploads
- Firebase integration
- JWT for authentication (implied)

## Installation

### Prerequisites
- Node.js
- MongoDB

### Setup

1. Clone the repository
```
git clone https://github.com/billa-bharath/My-FullStack-Project.git
cd My-FullStack-Project
```

2. Install dependencies
```
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Environment Setup
```
# Create a .env file in the backend directory
cd ../backend
touch .env
```

Add the following to the .env file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eshop
```

4. Start the application
```
# Start the backend server (from the backend directory)
npm start

# Start the frontend development server (from the frontend directory)
cd ../frontend
npm start
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get a specific order

## Project Structure

```
My-FullStack-Project/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Admin/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── package.json
└── README.md
```

## Usage

### Customer Flow
1. Browse products on the homepage
2. View product details
3. Add products to cart
4. Proceed to checkout
5. Complete the order

### Admin Flow
1. Login to admin dashboard
2. Manage products (add, edit, delete)
3. View and manage orders
4. Handle customer support requests

## License

This project is licensed under the ISC License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
