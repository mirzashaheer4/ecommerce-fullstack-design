import React, { useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ShoppingBag, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useSettings } from '../context/SettingsContext';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const { formatPrice, currency } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();
  const orderDetails = location.state || {};

  const orderNumber = useMemo(() => {
    return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  }, []);

  useEffect(() => {
    document.title = 'Order Confirmed | E-commerce Store';
    
    // Save order and clear cart
    if (cartItems.length > 0) {
      const newOrder = {
        id: orderNumber,
        date: new Date().toISOString(),
        items: [...cartItems],
        total: orderDetails.orderTotal || cartTotal,
        subtotal: orderDetails.subtotal || cartTotal,
        shipping: orderDetails.shipping || 0,
        tax: orderDetails.tax || 0,
        couponDiscount: orderDetails.couponDiscount || 0,
        currency: orderDetails.currency || currency,
        status: 'Processing'
      };
      
      const storageKey = user ? `ecommerce_orders_${user._id}` : 'ecommerce_orders_guest';
      const existingOrders = JSON.parse(localStorage.getItem(storageKey) || '[]');
      localStorage.setItem(storageKey, JSON.stringify([newOrder, ...existingOrders]));
      
      clearCart();
    }
  }, [cartItems, cartTotal, orderNumber, user, clearCart, orderDetails, currency]);

  return (
    <div className="order-confirmation-page page-animate">
      <div className="order-card card-animate">
        {/* Animated checkmark */}
        <div className="check-circle">
          <svg className="check-svg" viewBox="0 0 52 52">
            <circle className="check-bg" cx="26" cy="26" r="25" fill="none" />
            <path className="check-mark" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>

        <h1>Order Placed Successfully!</h1>
        <p className="order-number">Order Number: <strong>{orderNumber}</strong></p>
        <p className="order-message">Thank you for your purchase. Your order has been received and is being processed.</p>

        {(orderDetails.orderTotal || cartTotal) > 0 && (
          <div className="order-summary-mini">
            <div className="summary-row">
              <span>Items ordered</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount</span>
              <span>{formatPrice(orderDetails.orderTotal || cartTotal)}</span>
            </div>
          </div>
        )}

        <div className="order-actions">
          <Link to="/products" className="btn-primary order-btn">
            <ShoppingBag size={18} /> Continue Shopping
          </Link>
          <button
            className="btn-outline order-btn"
            onClick={() => showToast('Order tracking will be available soon', 'info')}
          >
            <MapPin size={18} /> Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
