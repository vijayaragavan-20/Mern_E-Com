import './App.css';
import Navbar from './Components/Assets/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Shop from './Pages/Shop';

import Support from './Pages/Support';
import Products from './Pages/Product';
import Contact from './Pages/Contact';
import Wishlist from './Pages/Wishlist';
import Cart from './Pages/Cart'
import Buy from './Pages/Buy';
import OfferPage from './Pages/OfferPage';
import FinishOrder from './Pages/FinishOrder';
import OrderConfirmation from './Pages/OrderConfirmation';
import Orders from './Pages/Orders';
import AdminDashboard from './Admin/AdminDashboard';
// import AdminLogin from  '.Admin/AdminLogin';
// import ProductList from './Pages/ProductList';
// import AdminPage from './Pages/AdminPage';
// import AdminApp from './admin/AdminApp';
// import AdminLogin from './Pages/AdminLogin';
// import AdminProducts from './Pages/AdminProducts';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path='/' element={<Shop />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/support' element={<Support />} />
          <Route path='/products' element={<Products />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Wishlist' element={<Wishlist />} />
          
          <Route path='/Register' element={<Register />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/OfferPage" element={<OfferPage />} />
          <Route path="/finish" element={<FinishOrder />} />
          <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Admin" element={<AdminDashboard />}/>
          {/* <Route path="/AdminLogin" element={<AdminLogin />}/> */}
          {/* <Route path="/products" element={<ProductList />} /> */}

          
          {/* <Route path="/Admin" element={<AdminPage />} /> */}
          {/* <Route path="/AdminApp" element={<AdminApp />} /> */}
          {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
          {/* <Route path="/Admin/products" element={<AdminProducts />} /> */}


        
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
