import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById, fetchRelatedProducts } from '../api/productApi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useSettings } from '../context/SettingsContext';
import ProductDetailsSkeleton from '../components/ProductDetailsSkeleton';
import './ProductDetails.css';
import { ChevronRight, Star, Heart, Check, MessageSquare, Shield, Globe, ArrowLeft } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const { formatPrice } = useSettings();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImg, setSelectedImg] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);

      const prod = await fetchProductById(id);
      if (!prod) {
        setError('Product not found');
        setLoading(false);
        return;
      }

      setProduct(prod);
      setSelectedImg(prod.images?.[0] || '');
      document.title = `${prod.name} | E-commerce Store`;

      const related = await fetchRelatedProducts(id);
      setRelatedProducts(related);

      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-details-page container">
        <div className="breadcrumb">
          <span>Home</span>
          <ChevronRight size={16} />
          <span>Loading...</span>
        </div>
        <ProductDetailsSkeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-page container" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2 style={{ marginBottom: '16px', color: 'var(--color-text-primary)' }}>Product not found</h2>
        <p style={{ marginBottom: '24px', color: 'var(--color-text-muted)' }}>
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/products" className="btn-primary with-icon" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={18} /> Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`${product.name} added to cart!`, 'success');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    const msg = isInWishlist(product._id) ? 'Removed from wishlist' : 'Added to wishlist';
    showToast(msg, 'info');
  };

  return (
    <div className="product-details-page container page-animate">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span>
        <ChevronRight size={16} />
        <span>{product.category}</span>
        <ChevronRight size={16} />
        <span className="current">{product.name}</span>
      </div>

      {/* Main Details Section */}
      <div className="details-card">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="main-image">
            <img src={selectedImg} alt={product.name} />
          </div>
          <div className="thumbnail-list">
            {(product.images || []).map((img, i) => (
              <div 
                key={i} 
                className={`thumbnail ${selectedImg === img ? 'active' : ''}`}
                onClick={() => setSelectedImg(img)}
              >
                <img src={img} alt={`Thumb ${i}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="product-info-main">
          <span className="in-stock"><Check size={16} /> {product.stock > 0 ? 'In stock' : 'Out of stock'}</span>
          <h1 className="detail-title">{product.name}</h1>
          <div className="detail-meta">
            <div className="rating-stars">
              {[1,2,3,4,5].map(star => <Star key={star} size={16} fill={star <= Math.round(product.rating) ? '#FF9017' : '#DEE2E7'} color={star <= Math.round(product.rating) ? '#FF9017' : '#DEE2E7'} />)}
              <span className="rating-value">{product.rating}</span>
            </div>
            <span className="dot">•</span>
            <span className="meta-text"><MessageSquare size={16} /> {product.reviewCount} reviews</span>
            <span className="dot">•</span>
            <span className="meta-text">154 sold</span>
          </div>

          <div className="price-tiers">
            <div className="tier highlight">
              <h4>{formatPrice(product.price)}</h4>
              <p>50-100 pcs</p>
            </div>
            <div className="tier">
              <h4>{formatPrice(product.price * 0.92)}</h4>
              <p>100-700 pcs</p>
            </div>
            <div className="tier">
              <h4>{formatPrice(product.price * 0.8)}</h4>
              <p>700+ pcs</p>
            </div>
          </div>

          <div className="specs-list">
            <div className="spec-row">
              <span className="spec-label">Price:</span>
              <span className="spec-value">Negotiable</span>
            </div>
            <div className="spec-row border-bottom"></div>
            <div className="spec-row">
              <span className="spec-label">Type:</span>
              <span className="spec-value">Classic shoes</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Material:</span>
              <span className="spec-value">Plastic material</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Design:</span>
              <span className="spec-value">Modern nice</span>
            </div>
            <div className="spec-row border-bottom"></div>
            <div className="spec-row">
              <span className="spec-label">Customization:</span>
              <span className="spec-value">Customized logo and<br/>design custom packages</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Protection:</span>
              <span className="spec-value">Refund Policy</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Warranty:</span>
              <span className="spec-value">2 years full warranty</span>
            </div>
          </div>
        </div>

        {/* Supplier Sidebar */}
        <div className="supplier-card-container">
          <div className="supplier-card">
            <div className="supplier-header">
              <div className="supplier-logo">R</div>
              <div className="supplier-name">
                <p>Supplier</p>
                <h4>Guanjoi Trading LLC</h4>
              </div>
            </div>
            <div className="supplier-info-list">
              <div className="supplier-info-item">
                <span className="flag">🇩🇪</span> Germany, Berlin
              </div>
              <div className="supplier-info-item">
                <Shield size={18} color="#00B517" /> Verified Seller
              </div>
              <div className="supplier-info-item">
                <Globe size={18} color="#8B96A5" /> Worldwide shipping
              </div>
            </div>
            <button className="btn-primary full-width" onClick={handleAddToCart}>Add to cart</button>
            <Link to="/profile" className="btn-outline full-width" style={{ display: 'block', textAlign: 'center' }}>Seller's profile</Link>
          </div>
          <button className={`save-later-btn ${isInWishlist(product._id) ? 'wishlisted' : ''}`} onClick={handleToggleWishlist}>
            <Heart size={20} fill={isInWishlist(product._id) ? '#0D6EFD' : 'none'} color="#0D6EFD" /> {isInWishlist(product._id) ? 'Saved' : 'Save for later'}
          </button>
        </div>
      </div>

      {/* Tabs and Right Sidebar */}
      <div className="content-layout">
        <div className="main-content">
          <div className="tabs-card">
            <div className="tabs-header">
              <button className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`} onClick={() => setActiveTab('description')}>Description</button>
              <button className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Reviews</button>
              <button className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`} onClick={() => setActiveTab('shipping')}>Shipping</button>
              <button className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>About seller</button>
            </div>
            <div className="tab-content">
              {activeTab === 'description' && (
                <>
                  <p className="description-text">
                    {product.description}
                    <br/><br/>
                    Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                  <table className="specs-table">
                    <tbody>
                      <tr><td>Model</td><td>#8786867</td></tr>
                      <tr><td>Style</td><td>Classic style</td></tr>
                      <tr><td>Certificate</td><td>ISO-898921212</td></tr>
                      <tr><td>Size</td><td>34mm x 450mm x 19mm</td></tr>
                      <tr><td>Memory</td><td>36GB RAM</td></tr>
                    </tbody>
                  </table>
                  <ul className="features-list">
                    <li><Check size={16} color="#8B96A5"/> Some great feature name here</li>
                    <li><Check size={16} color="#8B96A5"/> Lorem ipsum dolor sit amet, consectetur</li>
                    <li><Check size={16} color="#8B96A5"/> Duis aute irure dolor in reprehenderit</li>
                    <li><Check size={16} color="#8B96A5"/> Some great feature name here</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>

        <aside className="you-may-like">
          <h3>You may like</h3>
          <div className="small-product-list">
            {relatedProducts.slice(0, 5).map(p => (
              <Link to={`/products/${p._id}`} key={p._id} className="small-product">
                <img src={p.images?.[0]} alt={p.name} />
                <div className="sp-info">
                  <h4>{p.name}</h4>
                  <span className="sp-price">${p.price.toFixed(2)} - ${(p.price + 20).toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>

      {/* Related Products */}
      <section className="related-products">
        <h3>Related products</h3>
        <div className="related-grid">
          {relatedProducts.map(p => (
            <Link to={`/products/${p._id}`} key={p._id} className="related-card">
              <div className="img-wrap">
                <img src={p.images?.[0]} alt={p.name} />
              </div>
              <h4>{p.name}</h4>
              <span className="price">${p.price.toFixed(2)}-${(p.price + 8).toFixed(2)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Discount Banner */}
      <div className="discount-banner">
        <div className="banner-text-content">
          <h2>Super discount on more than 100 USD</h2>
          <p>Have you ever finally just write dummy info</p>
        </div>
        <Link to="/products" className="btn-secondary">Shop now</Link>
      </div>
    </div>
  );
};

export default ProductDetails;
