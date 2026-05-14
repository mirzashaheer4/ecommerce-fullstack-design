import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useSettings } from '../context/SettingsContext';
import './ProductCard.css';

const ProductCard = ({ product, variant = 'grid' }) => {
  const { _id, id, name, price, originalPrice, image, images, rating, reviewCount, description, freeShipping } = product;
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const { formatPrice } = useSettings();
  const productId = _id || id;
  const productImage = images?.[0] || image;
  const wishlisted = isInWishlist(productId);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({ ...product, _id: productId });
    showToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', 'info');
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
            <button className={`favorite-btn ${wishlisted ? 'wishlisted' : ''}`} onClick={handleToggleWishlist} title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
              <Heart size={20} fill={wishlisted ? '#0D6EFD' : 'none'} color="#0D6EFD" />
            </button>
          </div>
          <div className="product-price-section">
            <span className="current-price">{formatPrice(price)}</span>
            {originalPrice && <span className="original-price">{formatPrice(originalPrice)}</span>}
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
        <button className={`grid-wishlist-btn ${wishlisted ? 'wishlisted' : ''}`} onClick={handleToggleWishlist} title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
          <Heart size={18} fill={wishlisted ? '#0D6EFD' : 'none'} color={wishlisted ? '#0D6EFD' : '#8B96A5'} />
        </button>
      </div>
      <div className="product-info">
        <div className="product-price-section">
          <span className="current-price">{formatPrice(price)}</span>
          {originalPrice && <span className="original-price">{formatPrice(originalPrice)}</span>}
        </div>
        {renderStars()}
        <h3 className="product-name">{name}</h3>
      </div>
    </Link>
  );
};

export default ProductCard;
