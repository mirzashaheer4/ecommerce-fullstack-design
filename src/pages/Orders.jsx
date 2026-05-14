import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './EmptyState.css';

const Orders = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = 'My Orders | Brand eCommerce';
  }, []);

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
};

export default Orders;
