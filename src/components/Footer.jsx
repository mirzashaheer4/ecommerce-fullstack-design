import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import './Footer.css';

// Inline SVGs for brand icons not present in lucide-react
const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="logo-icon"></div>
              <span className="logo-text">Brand</span>
            </Link>
            <p className="brand-desc">
              Best information about the company gies here but now lorem ipsum is
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" onClick={(e) => { e.preventDefault(); alert('Facebook link clicked'); }}><FacebookIcon size={18} /></a>
              <a href="#" className="social-icon" onClick={(e) => { e.preventDefault(); alert('Twitter link clicked'); }}><TwitterIcon size={18} /></a>
              <a href="#" className="social-icon" onClick={(e) => { e.preventDefault(); alert('Linkedin link clicked'); }}><LinkedinIcon size={18} /></a>
              <a href="#" className="social-icon" onClick={(e) => { e.preventDefault(); alert('Instagram link clicked'); }}><InstagramIcon size={18} /></a>
              <a href="#" className="social-icon" onClick={(e) => { e.preventDefault(); alert('Youtube link clicked'); }}><YoutubeIcon size={18} /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-col">
              <h4>About</h4>
              <Link to="/about">About Us</Link>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Find store'); }}>Find store</a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Categories'); }}>Categories</a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Blogs'); }}>Blogs</a>
            </div>
            <div className="footer-col">
              <h4>Partnership</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('About Us'); }}>About Us</a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Find store'); }}>Find store</a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Categories'); }}>Categories</a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Blogs'); }}>Blogs</a>
            </div>
            <div className="footer-col">
              <h4>Information</h4>
              <Link to="/help">Help Center</Link>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Money Refund'); }}>Money Refund</a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Shipping'); }}>Shipping</a>
              <Link to="/contact">Contact us</Link>
            </div>
            <div className="footer-col">
              <h4>For users</h4>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Settings'); }}>Settings</a>
              <Link to="/orders">My Orders</Link>
            </div>
            <div className="footer-col">
              <h4>Get app</h4>
              <div className="app-links">
                <a href="#" onClick={(e) => { e.preventDefault(); alert('App Store link'); }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" style={{ height: '40px' }} />
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); alert('Google Play link'); }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" style={{ height: '40px' }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-content">
            <p>© 2023 Ecommerce.</p>
            <div className="bottom-settings">
              <button className="setting-btn" onClick={() => alert('Language changed')}>
                <span className="flag">🇺🇸</span> English <ChevronUp size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
