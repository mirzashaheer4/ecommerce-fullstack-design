import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, MapPin } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { formatPrice } = useSettings();
  const location = useLocation();
  const { state } = location;
  const order = state?.order;

  useEffect(() => {
    document.title = 'Order Confirmed | E-commerce Store';
  }, []);

  if (!order) {
    return (
      <div className="order-confirmation-page page-animate">
        <div className="order-card card-animate">
          <div className="check-circle">
            <svg className="check-svg" viewBox="0 0 52 52">
              <circle className="check-bg" cx="26" cy="26" r="25" fill="none" />
              <path className="check-mark" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <h1>Order Placed Successfully!</h1>
          <p className="order-message">Check your orders page for details.</p>
          <div className="order-actions">
            <Link to="/orders" className="btn-primary order-btn">
              View My Orders
            </Link>
            <Link to="/products" className="btn-outline order-btn">
              <ShoppingBag size={18} /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation-page page-animate">
      <div className="order-card card-animate" style={{ maxWidth: '600px', margin: '40px auto', padding: '40px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div className="check-circle">
          <svg className="check-svg" viewBox="0 0 52 52">
            <circle className="check-bg" cx="26" cy="26" r="25" fill="none" />
            <path className="check-mark" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>

        <h1>Order Placed Successfully!</h1>
        <p className="order-number">Order Number: <strong>{order.orderNumber}</strong></p>
        <p className="order-message">Thank you for your purchase. Your order has been received and is being processed.</p>

        <div className="order-summary-mini" style={{ textAlign: 'left', background: '#f9fafb', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          <h3 style={{ marginBottom: '15px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>Order Details</h3>
          
          <div style={{ marginBottom: '20px' }}>
            {order.items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {item.image && <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                  <span>{item.quantity}x {item.name}</span>
                </div>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '15px' }}>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{order.shippingCost === 0 ? 'Free' : formatPrice(order.shippingCost)}</span>
            </div>
            {order.discount > 0 && (
              <div className="summary-row">
                <span>Discount</span>
                <span style={{ color: '#ef4444' }}>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="summary-row total" style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #e5e7eb', fontWeight: 'bold' }}>
              <span>Total Amount</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'left', marginTop: '20px', padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
          <h4 style={{ marginBottom: '10px' }}>Delivery Information</h4>
          <p style={{ margin: 0 }}><strong>{order.deliveryInfo.fullName}</strong></p>
          <p style={{ margin: '4px 0' }}>{order.deliveryInfo.email}</p>
          <p style={{ margin: 0 }}>{order.deliveryInfo.address}, {order.deliveryInfo.city}</p>
          <p style={{ margin: 0 }}>{order.deliveryInfo.country}</p>
        </div>

        <div className="order-actions" style={{ marginTop: '30px' }}>
          <Link to="/orders" className="btn-primary order-btn">
            View My Orders
          </Link>
          <Link to="/products" className="btn-outline order-btn">
            <ShoppingBag size={18} /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
