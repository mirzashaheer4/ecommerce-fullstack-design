import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './ProductDetails.css';
import { ChevronRight, Star, Heart, Check, MessageSquare, Shield, Globe } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  // For demo purposes, we just grab the first product if not found
  const product = products.find(p => p.id === id) || products[0];
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="product-details-page container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span>
        <ChevronRight size={16} />
        <span>Clothings</span>
        <ChevronRight size={16} />
        <span>Men's wear</span>
        <ChevronRight size={16} />
        <span className="current">Summer clothing</span>
      </div>

      {/* Main Details Section */}
      <div className="details-card">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="thumbnail-list">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={`thumbnail ${i === 1 ? 'active' : ''}`}>
                <img src={product.image} alt={`Thumb ${i}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="product-info-main">
          <span className="in-stock"><Check size={16} /> In stock</span>
          <h1 className="detail-title">{product.name}</h1>
          <div className="detail-meta">
            <div className="rating-stars">
              {[1,2,3,4,5].map(star => <Star key={star} size={16} fill={star <= 4 ? '#FF9017' : '#DEE2E7'} color={star <= 4 ? '#FF9017' : '#DEE2E7'} />)}
              <span className="rating-value">9.3</span>
            </div>
            <span className="dot">•</span>
            <span className="meta-text"><MessageSquare size={16} /> 32 reviews</span>
            <span className="dot">•</span>
            <span className="meta-text">154 sold</span>
          </div>

          <div className="price-tiers">
            <div className="tier highlight">
              <h4>$98.00</h4>
              <p>50-100 pcs</p>
            </div>
            <div className="tier">
              <h4>$90.00</h4>
              <p>100-700 pcs</p>
            </div>
            <div className="tier">
              <h4>$78.00</h4>
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
            <button className="btn-primary full-width">Send inquiry</button>
            <button className="btn-outline full-width">Seller's profile</button>
          </div>
          <button className="save-later-btn">
            <Heart size={20} color="#0D6EFD" /> Save for later
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/><br/>
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
            {products.slice(4, 9).map(p => (
              <Link to={`/products/${p.id}`} key={p.id} className="small-product">
                <img src={p.image} alt={p.name} />
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
          {products.slice(0, 6).map(p => (
            <div key={p.id} className="related-card">
              <div className="img-wrap">
                <img src={p.image} alt={p.name} />
              </div>
              <h4>{p.name}</h4>
              <span className="price">${p.price.toFixed(2)}-${(p.price + 8).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Discount Banner */}
      <div className="discount-banner">
        <div className="banner-text-content">
          <h2>Super discount on more than 100 USD</h2>
          <p>Have you ever finally just write dummy info</p>
        </div>
        <button className="btn-secondary">Shop now</button>
      </div>
    </div>
  );
};

export default ProductDetails;
