import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, variant = 'grid' }) => {
  const { _id, id, name, price, originalPrice, image, images, rating, reviewCount, description, freeShipping } = product;
  const { addToCart } = useCart();
  const productId = _id || id;
  const productImage = images?.[0] || image;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

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
          <img src={productImage} alt={name} className="product-image" />
        </div>
        <div className="product-info">
          <div className="info-top">
            <h3 className="product-name">{name}</h3>
            <button className="favorite-btn" onClick={handleAddToCart} title="Add to cart"><Heart size={20} color="#0D6EFD" /></button>
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
          <Link to={`/products/${productId}`} className="view-details">View details</Link>
        </div>
      </div>
    );
  }

  // Grid variant
  return (
    <Link to={`/products/${productId}`} className="product-card grid-variant" style={{ textDecoration: 'none' }}>
      <div className="product-image-container">
        <img src={productImage} alt={name} className="product-image" />
      </div>
      <div className="product-info">
        <div className="product-price-section">
          <span className="current-price">${price.toFixed(2)}</span>
          {originalPrice && <span className="original-price">${originalPrice.toFixed(2)}</span>}
        </div>
        {renderStars()}
        <h3 className="product-name">{name}</h3>
      </div>
    </Link>
  );
};

export default ProductCard;
