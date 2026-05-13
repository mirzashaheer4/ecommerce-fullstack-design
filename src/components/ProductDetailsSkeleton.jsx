import React from 'react';
import './Skeleton.css';

const ProductDetailsSkeleton = () => {
  return (
    <div className="skeleton-details">
      {/* Gallery skeleton */}
      <div className="skeleton-gallery">
        <div className="skeleton skeleton-main-img"></div>
        <div className="skeleton-thumbs">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton skeleton-thumb"></div>
          ))}
        </div>
      </div>

      {/* Info skeleton */}
      <div className="skeleton-detail-info">
        <div className="skeleton skeleton-line short"></div>
        <div className="skeleton skeleton-line full" style={{ height: '24px' }}></div>
        <div className="skeleton skeleton-line medium"></div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
          <div className="skeleton" style={{ width: '120px', height: '60px' }}></div>
          <div className="skeleton" style={{ width: '120px', height: '60px' }}></div>
          <div className="skeleton" style={{ width: '120px', height: '60px' }}></div>
        </div>
        <div className="skeleton skeleton-line full" style={{ marginTop: '16px' }}></div>
        <div className="skeleton skeleton-line full"></div>
        <div className="skeleton skeleton-line medium"></div>
        <div className="skeleton skeleton-line full"></div>
        <div className="skeleton skeleton-line short"></div>
      </div>

      {/* Supplier skeleton */}
      <div className="skeleton-supplier">
        <div className="skeleton-supplier-card">
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '50%' }}></div>
            <div style={{ flex: 1 }}>
              <div className="skeleton skeleton-line short"></div>
              <div className="skeleton skeleton-line medium"></div>
            </div>
          </div>
          <div className="skeleton skeleton-line full"></div>
          <div className="skeleton skeleton-line full"></div>
          <div className="skeleton skeleton-line full"></div>
          <div className="skeleton" style={{ width: '100%', height: '40px', marginTop: '16px' }}></div>
          <div className="skeleton" style={{ width: '100%', height: '40px', marginTop: '8px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
