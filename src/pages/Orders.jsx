import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import './EmptyState.css';

const Orders = () => {
  const { user } = useAuth();
  const { formatPrice } = useSettings();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    document.title = 'My Orders | E-commerce Store';
    
    // Load orders
    const storageKey = user ? `ecommerce_orders_${user._id}` : 'ecommerce_orders_guest';
    const savedOrders = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setOrders(savedOrders);
  }, [user]);

  if (orders.length === 0) {
    return (
      <div className="empty-state-page page-animate">
        <div className="container">
          <div className="empty-state-content">
            <div className="empty-icon-circle">
              <Package size={48} color="#8B96A5" />
            </div>
            <h2>No orders yet</h2>
            <p>When you place an order, it will appear here for you to track.</p>
            <Link to="/products" className="btn-primary empty-cta">
              <ShoppingBag size={18} /> Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page container page-animate" style={{ padding: '40px 16px', minHeight: '60vh' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '24px', color: 'var(--color-text-primary)' }}>My Orders</h2>
      <div className="orders-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {orders.map(order => (
          <div key={order.id} className="order-card" style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '24px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div className="order-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-text-primary)' }}>Order {order.id}</h3>
                <div style={{ display: 'flex', gap: '16px', color: 'var(--color-text-muted)', fontSize: '14px', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={16} /> {new Date(order.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <DollarSign size={16} /> {formatPrice(order.total)}
                  </span>
                </div>
              </div>
              <span style={{ padding: '6px 12px', backgroundColor: '#E3F0FF', color: 'var(--color-primary)', borderRadius: '6px', fontSize: '14px', fontWeight: '600' }}>
                {order.status}
              </span>
            </div>
            
            <div className="order-items" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {order.items.map((item, index) => (
                <div key={index} className="order-item" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px', objectFit: 'contain', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '4px', backgroundColor: '#F7FAFC' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '500', color: 'var(--color-text-primary)', marginBottom: '4px' }}>{item.name}</h4>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Qty: {item.qty} <span style={{ margin: '0 8px' }}>|</span> {formatPrice(item.price * item.qty)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-footer" style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/products" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '6px', fontWeight: '500' }}>
                Buy Again <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
