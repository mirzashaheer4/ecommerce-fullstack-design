import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, Lock } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useSettings } from '../context/SettingsContext';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const { formatPrice } = useSettings();

  useEffect(() => {
    document.title = 'Wishlist | E-commerce Store';
  }, []);

  // Not logged in state
  if (!isAuthenticated) {
    return (
      <div className="wishlist-page page-animate">
        <div className="container empty-state">
          <div className="empty-content">
            <div className="empty-icon-circle">
              <Lock size={48} color="#8B96A5" />
            </div>
            <h2>Login to view your wishlist</h2>
            <p>Save your favorite items and access them from anywhere.</p>
            <Link to="/login" className="btn-primary empty-btn">Login</Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty wishlist
  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page page-animate">
        <div className="container empty-state">
          <div className="empty-content">
            <div className="empty-icon-circle">
              <Heart size={48} color="#8B96A5" />
            </div>
            <h2>No items in your wishlist yet</h2>
            <p>Browse our products and tap the heart icon to save favorites.</p>
            <Link to="/products" className="btn-primary empty-btn">Browse Products</Link>
          </div>
        </div>
      </div>
    );
  }

  const handleMoveToCart = (item) => {
    addToCart({ _id: item._id, name: item.name, price: item.price, images: [item.image] });
    removeFromWishlist(item._id);
    showToast(`${item.name} moved to cart`, 'success');
  };

  return (
    <div className="wishlist-page page-animate">
      <div className="container">
        <h2 className="page-title">My Wishlist ({wishlistItems.length})</h2>
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item._id} className="wishlist-card">
              <Link to={`/products/${item._id}`} className="wishlist-image">
                <img src={item.image} alt={item.name} />
              </Link>
              <div className="wishlist-info">
                <Link to={`/products/${item._id}`} className="wishlist-name">{item.name}</Link>
                <span className="wishlist-price">{formatPrice(item.price)}</span>
                {item.category && <span className="wishlist-category">{item.category}</span>}
              </div>
              <div className="wishlist-actions">
                <button className="btn-primary wishlist-cart-btn" onClick={() => handleMoveToCart(item)}>
                  <ShoppingCart size={14} /> Move to Cart
                </button>
                <button className="wishlist-remove-btn" onClick={() => { removeFromWishlist(item._id); showToast('Removed from wishlist', 'info'); }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
