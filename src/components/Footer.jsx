import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, ChevronUp } from 'lucide-react';
import './Footer.css';

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
              <a href="#" className="social-icon"><Facebook size={18} fill="currentColor" /></a>
              <a href="#" className="social-icon"><Twitter size={18} fill="currentColor" /></a>
              <a href="#" className="social-icon"><Linkedin size={18} fill="currentColor" /></a>
              <a href="#" className="social-icon"><Instagram size={18} /></a>
              <a href="#" className="social-icon"><Youtube size={18} /></a>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-column">
              <h4>About</h4>
              <Link to="/about">About Us</Link>
              <Link to="/find-store">Find store</Link>
              <Link to="/categories">Categories</Link>
              <Link to="/blogs">Blogs</Link>
            </div>
            <div className="link-column">
              <h4>Partnership</h4>
              <Link to="/about">About Us</Link>
              <Link to="/find-store">Find store</Link>
              <Link to="/categories">Categories</Link>
              <Link to="/blogs">Blogs</Link>
            </div>
            <div className="link-column">
              <h4>Information</h4>
              <Link to="/help">Help Center</Link>
              <Link to="/refund">Money Refund</Link>
              <Link to="/shipping">Shipping</Link>
              <Link to="/contact">Contact us</Link>
            </div>
            <div className="link-column">
              <h4>For users</h4>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/settings">Settings</Link>
              <Link to="/orders">My Orders</Link>
            </div>
          </div>

          <div className="footer-app">
            <h4>Get app</h4>
            <div className="app-buttons">
              <img src="https://placehold.co/120x40/000000/FFFFFF?text=App+Store" alt="App Store" />
              <img src="https://placehold.co/120x40/000000/FFFFFF?text=Google+Play" alt="Google Play" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container bottom-container">
          <p>© 2023 Ecommerce.</p>
          <div className="footer-language">
            <span className="flag">🇺🇸</span>
            <span>English</span>
            <ChevronUp size={16} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
