import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, MessageSquare, Heart, ShoppingCart, Menu, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
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

        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <div className="category-select">
            <span>All category</span>
            <ChevronDown size={16} />
          </div>
          <button className="search-btn">Search</button>
        </div>

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
          <Link to="/cart" className="action-item">
            <ShoppingCart size={22} strokeWidth={1.5} color="#8B96A5" />
            <span>My cart</span>
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="navbar-bottom">
        <div className="container bottom-container">
          <div className="bottom-links">
            <button className="menu-btn">
              <Menu size={20} />
              <span>All category</span>
            </button>
            <Link to="/hot-offers">Hot offers</Link>
            <Link to="/gift-boxes">Gift boxes</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/menu-item">Menu item</Link>
            <button className="help-btn">
              <span>Help</span>
              <ChevronDown size={16} />
            </button>
          </div>
          <div className="bottom-settings">
            <button className="setting-btn">
              <span>English, USD</span>
              <ChevronDown size={16} />
            </button>
            <button className="setting-btn">
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
