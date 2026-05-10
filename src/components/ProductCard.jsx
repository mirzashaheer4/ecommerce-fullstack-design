import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, variant = 'grid' }) => {
  const { id, name, price, originalPrice, image, rating, reviewCount, description, freeShipping } = product;

  const renderStars = () => {
    return (
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={16} fill={star <= rating ? '#FF9017' : '#DEE2E7'} color={star <= rating ? '#FF9017' : '#DEE2E7'} />
        ))}
        <span className="rating-value">{rating}</span>
      </div>
    );
  };

  if (variant === 'list') {
    return (
      <div className="product-card list-variant">
        <div className="product-image-container">
          <img src={image} alt={name} className="product-image" />
        </div>
        <div className="product-info">
          <div className="info-top">
            <h3 className="product-name">{name}</h3>
            <button className="favorite-btn"><Heart size={20} color="#0D6EFD" /></button>
          </div>
          <div className="product-price-section">
            <span className="current-price">${price.toFixed(2)}</span>
            {originalPrice && <span className="original-price">${originalPrice.toFixed(2)}</span>}
          </div>
          <div className="product-meta">
            {renderStars()}
            <span className="dot">•</span>
            <span className="reviews">{reviewCount} orders</span>
            {freeShipping && (
              <>
                <span className="dot">•</span>
                <span className="free-shipping">Free Shipping</span>
              </>
            )}
          </div>
          <p className="product-desc">{description}</p>
          <Link to={`/products/${id}`} className="view-details">View details</Link>
        </div>
      </div>
    );
  }

  // Grid variant
  return (
    <div className="product-card grid-variant">
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
      </div>
      <div className="product-info">
        <div className="product-price-section">
          <span className="current-price">${price.toFixed(2)}</span>
          {originalPrice && <span className="original-price">${originalPrice.toFixed(2)}</span>}
        </div>
        {renderStars()}
        <h3 className="product-name">{name}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
