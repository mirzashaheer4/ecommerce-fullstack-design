import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { SettingsProvider } from './context/SettingsContext';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/Toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import OrderConfirmation from './pages/OrderConfirmation';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Messages from './pages/Messages';
import NotFound from './pages/NotFound';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminOrders from './pages/admin/AdminOrders';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <SettingsProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                <Toast />
              <Routes>
                {/* ===== Admin Routes (no Navbar/Footer) ===== */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAuth requireAdmin>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="products/new" element={<AdminProductForm />} />
                  <Route path="products/:id/edit" element={<AdminProductForm />} />
                  <Route path="orders" element={<AdminOrders />} />
                </Route>

                {/* ===== Public / Customer Routes (with Navbar/Footer) ===== */}
                <Route
                  path="*"
                  element={
                    <div className="app-container">
                      <Navbar />
                      <main>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/products" element={<ProductListing />} />
                          <Route path="/products/:id" element={<ProductDetails />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/wishlist" element={<Wishlist />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/order-confirmation" element={<OrderConfirmation />} />
                          <Route
                            path="/profile"
                            element={
                              <ProtectedRoute requireAuth>
                                <Profile />
                              </ProtectedRoute>
                            }
                          />
                          <Route path="/orders" element={<Orders />} />
                          <Route path="/messages" element={<Messages />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                      <Footer />
                    </div>
                  }
                />
              </Routes>
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </SettingsProvider>
    </Router>
  );
}

export default App;
