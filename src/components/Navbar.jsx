import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, MessageSquare, Heart, ShoppingCart, Menu, ChevronDown, X, LogOut, Shield, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated, isAdmin, user, logoutUser } = useAuth();
  const { showToast } = useToast();
  const dropdownRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    setShowUserDropdown(false);
    logoutUser();
    navigate('/login');
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowUserDropdown(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
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
          <div
            className="category-select"
            onClick={() => navigate('/products')}
          >
            <span>All category</span>
            <ChevronDown size={16} />
          </div>
          <button type="submit" className="search-btn">Search</button>
        </form>

        <div className="nav-actions">
          {isAuthenticated ? (
            /* Authenticated: show user dropdown */
            <div className="user-dropdown-container" ref={dropdownRef}>
              <button
                className="action-item user-action-btn"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <div className="user-avatar-small">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <span>{user?.name?.split(' ')[0] || 'Account'}</span>
                  <ChevronDown size={12} />
                </div>
              </button>
              {showUserDropdown && (
                <div className="user-dropdown">
                  <div className="dropdown-user-info">
                    <div className="dropdown-avatar">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="dropdown-name">{user?.name}</p>
                      <p className="dropdown-email">{user?.email}</p>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowUserDropdown(false)}>
                    <Settings size={16} /> My Profile
                  </Link>
                  <Link to="/orders" className="dropdown-item" onClick={() => setShowUserDropdown(false)}>
                    <MessageSquare size={16} /> My Orders
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="dropdown-item" onClick={() => setShowUserDropdown(false)}>
                      <Shield size={16} /> Admin Panel
                    </Link>
                  )}
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Not authenticated: show login/register links */
            <>
              <Link to="/login" className="action-item">
                <User size={22} strokeWidth={1.5} color="#8B96A5" />
                <span>Login</span>
              </Link>
              <Link to="/register" className="action-item">
                <User size={22} strokeWidth={1.5} color="#8B96A5" />
                <span>Register</span>
              </Link>
            </>
          )}
          <Link to="/messages" className="action-item">
            <MessageSquare size={22} strokeWidth={1.5} color="#8B96A5" />
            <span>Message</span>
          </Link>
          <Link to="/wishlist" className="action-item cart-action">
            <Heart size={22} strokeWidth={1.5} color="#8B96A5" />
            {wishlistCount > 0 && <span className="cart-badge wishlist-badge">{wishlistCount}</span>}
            <span>Wishlist</span>
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
            <Link to="/products" className="menu-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setIsMenuOpen(false)}>
              <Menu size={20} />
              <span>All category</span>
            </Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>Hot offers</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>Gift boxes</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>Projects</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </div>
          <div className="bottom-settings">
            <button className="setting-btn" onClick={() => showToast('Language & currency settings saved', 'info')}>
              <span>English, USD</span>
              <ChevronDown size={16} />
            </button>
            <button className="setting-btn" onClick={() => showToast('Shipping destination updated', 'info')}>
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
