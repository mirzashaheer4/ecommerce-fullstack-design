import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, ChevronDown, X, LogOut, Shield, Settings, User, MessageSquare, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import './Navbar.css';

// Solid Icons
const SolidProfileIcon = ({ size = 24, color = "#8B96A5" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const SolidMessageIcon = ({ size = 24, color = "#8B96A5" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 10H7v-2h10v2zm0-3H7V7h10v2z" />
  </svg>
);

const SolidHeartIcon = ({ size = 24, color = "#8B96A5" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const SolidCartIcon = ({ size = 24, color = "#8B96A5" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.86 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25z" />
  </svg>
);

const BrandBagIcon = ({ size = 24, color = "#FFFFFF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const SolidOrdersIcon = ({ size = 24, color = "#8B96A5" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14H6v-2h4v2zm0-4H6v-2h4v2zm0-4H6V7h4v2zm8 8h-6v-2h6v2zm0-4h-6v-2h6v2zm0-4h-6V7h6v2z" />
  </svg>
);

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
    setIsMenuOpen(false);
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

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      
      {/* Mobile Drawer Overlay */}
      <div 
        className={`mobile-drawer-overlay ${isMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="logo" onClick={() => setIsMenuOpen(false)}>
            <Link to="/">
              <div className="logo-icon"><BrandBagIcon size={20} color="#FFFFFF" /></div>
              <span className="logo-text">Brand</span>
            </Link>
          </div>
          <button className="drawer-close" onClick={() => setIsMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="drawer-content">
          <div className="drawer-links">
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>All category</Link>
            <Link to="/products?category=Hot offers" onClick={() => setIsMenuOpen(false)}>Hot offers</Link>
            <Link to="/products?category=Gift boxes" onClick={() => setIsMenuOpen(false)}>Gift boxes</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </div>

          <div className="drawer-divider"></div>

          <div className="drawer-actions">
            {isAuthenticated ? (
              <>
                <div className="drawer-user-info">
                  <div className="drawer-avatar">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="drawer-name">{user?.name}</p>
                    <p className="drawer-email">{user?.email}</p>
                  </div>
                </div>
                <Link to="/profile" className="drawer-action-link" onClick={() => setIsMenuOpen(false)}>
                  <Settings size={20} /> My Profile
                </Link>
                <Link to="/orders" className="drawer-action-link" onClick={() => setIsMenuOpen(false)}>
                  <MessageSquare size={20} /> My Orders
                </Link>
                <Link to="/wishlist" className="drawer-action-link" onClick={() => setIsMenuOpen(false)}>
                  <Heart size={20} /> My Wishlist
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="drawer-action-link" onClick={() => setIsMenuOpen(false)}>
                    <Shield size={20} /> Admin Panel
                  </Link>
                )}
                <button className="drawer-action-link drawer-logout" onClick={handleLogout}>
                  <LogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="drawer-action-link" onClick={() => setIsMenuOpen(false)}>
                  <User size={20} /> Login
                </Link>
                <Link to="/register" className="drawer-action-link" onClick={() => setIsMenuOpen(false)}>
                  <User size={20} /> Register
                </Link>
              </>
            )}
          </div>
          
          <div className="drawer-divider"></div>

          <div className="drawer-settings">
            <button className="drawer-action-link" onClick={() => showToast('Language & currency settings saved', 'info')}>
              English, USD
            </button>
            <button className="drawer-action-link" onClick={() => showToast('Shipping destination updated', 'info')}>
              Ship to 🇩🇪
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar Row */}
      <div className="navbar-top container">
        
        {/* Mobile Hamburger (Hidden on desktop) */}
        <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(true)}>
          <Menu size={24} />
        </button>

        <div className="logo">
          <Link to="/">
            <div className="logo-icon"><BrandBagIcon size={20} color="#FFFFFF" /></div>
            <span className="logo-text">Brand</span>
          </Link>
        </div>

        {/* Desktop Search Bar (Hidden on mobile) */}
        <form className="search-bar desktop-search desktop-only" onSubmit={handleSearch}>
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
            <div className="user-dropdown-container desktop-only" ref={dropdownRef}>
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
            <>
              <Link to="/profile" className="action-item desktop-only">
                <SolidProfileIcon size={24} color="#8B96A5" />
                <span>Profile</span>
              </Link>
            </>
          )}

          <Link to="/messages" className="action-item desktop-only">
            <SolidMessageIcon size={24} color="#8B96A5" />
            <span>Message</span>
          </Link>

          <Link to="/orders" className="action-item desktop-only">
            <SolidOrdersIcon size={24} color="#8B96A5" />
            <span>Orders</span>
          </Link>
          
          <Link to="/wishlist" className="action-item cart-action desktop-only">
            <SolidHeartIcon size={24} color="#8B96A5" />
            {wishlistCount > 0 && <span className="cart-badge wishlist-badge">{wishlistCount}</span>}
            <span>Saved</span>
          </Link>

          {/* User Icon visible on Mobile next to Cart */}
          {!isAuthenticated ? (
            <Link to="/profile" className="action-item mobile-only user-mobile-icon">
              <SolidProfileIcon size={26} color="#8B96A5" />
            </Link>
          ) : (
            <Link to="/profile" className="action-item mobile-only user-mobile-icon">
               <div className="user-avatar-small" style={{ width: '24px', height: '24px', fontSize: '12px' }}>
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
            </Link>
          )}

          <Link to="/cart" className="action-item cart-action">
            <SolidCartIcon size={26} color="#8B96A5" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            <span className="desktop-only">My cart</span>
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar (Only visible on mobile) */}
      <div className="mobile-search-container">
        <form className="mobile-search-bar container" onSubmit={handleSearch}>
          <Search size={18} color="#8B96A5" className="mobile-search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Bottom Bar (Desktop Only) */}
      <div className="navbar-bottom desktop-only-bar">
        <div className="container bottom-container">
          <div className="bottom-links">
            <Link to="/products" className="menu-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Menu size={20} />
              <span>All category</span>
            </Link>
            <Link to="/products?category=Hot offers">Hot offers</Link>
            <Link to="/products?category=Gift boxes">Gift boxes</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
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
