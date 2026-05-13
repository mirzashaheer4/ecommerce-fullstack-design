import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Placeholder from './pages/Placeholder';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Placeholder title="User Profile" />} />
              <Route path="/messages" element={<Placeholder title="Messages" />} />
              <Route path="/orders" element={<Placeholder title="My Orders" />} />
              <Route path="/about" element={<Placeholder title="About Us" />} />
              <Route path="/contact" element={<Placeholder title="Contact Us" />} />
              <Route path="/help" element={<Placeholder title="Help Center" />} />
              <Route path="/login" element={<Placeholder title="Login" />} />
              <Route path="/register" element={<Placeholder title="Register" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
