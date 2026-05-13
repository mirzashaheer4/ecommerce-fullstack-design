import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Placeholder = ({ title }) => {
  useEffect(() => {
    document.title = `${title} | Brand eCommerce`;
  }, [title]);

  return (
    <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '16px', color: 'var(--color-primary)' }}>{title}</h1>
      <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
        This page is currently under development. Check back soon for more functionality!
      </p>
      <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}>
        <ArrowLeft size={20} /> Back to Home
      </Link>
    </div>
  );
};

export default Placeholder;
