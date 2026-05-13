import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, MessageSquare, Heart, ShoppingCart, Menu, ChevronDown, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="navbar">
      {/* Top Bar */}
      <div className="navbar-top container">
        <div className="logo">
          <Link to="/">
            <div className="logo-icon"></div>
            <span className="logo-text">Brand</span>
          </Link>
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="category-select" onClick={() => alert('Filter by category coming soon!')}>
            <span>All category</span>
            <ChevronDown size={16} />
          </div>
          <button type="submit" className="search-btn">Search</button>
        </form>

        <div className="nav-actions">
          <Link to="/profile" className="action-item">
            <User size={22} strokeWidth={1.5} color="#8B96A5" />
            <span>Profile</span>
          </Link>
          <Link to="/messages" className="action-item">
            <MessageSquare size={22} strokeWidth={1.5} color="#8B96A5" />
            <span>Message</span>
          </Link>
          <Link to="/orders" className="action-item">
            <Heart size={22} strokeWidth={1.5} color="#8B96A5" />
            <span>Orders</span>
          </Link>
          <Link to="/cart" className="action-item cart-action">
            <ShoppingCart size={22} strokeWidth={1.5} color="#8B96A5" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            <span>My cart</span>
          </Link>
        </div>

        <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Bottom Bar */}
      <div className={`navbar-bottom ${isMenuOpen ? 'mobile-show' : ''}`}>
        <div className="container bottom-container">
          <div className="bottom-links">
            <Link to="/products" className="menu-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Menu size={20} />
              <span>All category</span>
            </Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>Hot offers</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>Gift boxes</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>Projects</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>Menu item</Link>
            <button className="help-btn" onClick={() => alert('Help center coming soon!')}>
              <span>Help</span>
              <ChevronDown size={16} />
            </button>
          </div>
          <div className="bottom-settings">
            <button className="setting-btn" onClick={() => alert('Language/Currency settings coming soon!')}>
              <span>English, USD</span>
              <ChevronDown size={16} />
            </button>
            <button className="setting-btn" onClick={() => alert('Shipping settings coming soon!')}>
              <span>Ship to 🇩🇪</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
