import React from 'react';
import './Skeleton.css';

const ProductCardSkeleton = ({ variant = 'grid' }) => {
  if (variant === 'list') {
    return (
      <div className="skeleton-card list-variant">
        <div className="skeleton skeleton-image"></div>
        <div className="skeleton-info">
          <div className="skeleton skeleton-line full"></div>
          <div className="skeleton skeleton-line price"></div>
          <div className="skeleton skeleton-line medium"></div>
          <div className="skeleton skeleton-line short"></div>
          <div className="skeleton skeleton-line full"></div>
          <div className="skeleton skeleton-line medium"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="skeleton-card grid-variant">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton-info">
        <div className="skeleton skeleton-line price"></div>
        <div className="skeleton skeleton-line short"></div>
        <div className="skeleton skeleton-line full"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
