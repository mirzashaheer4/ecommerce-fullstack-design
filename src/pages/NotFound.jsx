import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found | Brand eCommerce';
  }, []);

  return (
    <div className="not-found-page page-animate">
      <div className="not-found-content">
        <span className="not-found-code">404</span>
        <h1>Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary not-found-btn">
          <Home size={18} /> Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
