import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import './EmptyState.css';

const Messages = () => {
  useEffect(() => {
    document.title = 'Messages | E-commerce Store';
  }, []);

  return (
    <div className="empty-state-page page-animate">
      <div className="container">
        <div className="empty-state-content">
          <div className="empty-icon-circle">
            <MessageCircle size={48} color="#8B96A5" />
          </div>
          <h2>No messages yet</h2>
          <p>Your conversations with sellers and support will appear here.</p>
          <Link to="/products" className="btn-primary empty-cta">
            <ShoppingBag size={18} /> Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Messages;
