import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import './Cart.css';
import { ArrowLeft, Lock, MessageSquare, Truck } from 'lucide-react';

const Cart = () => {
  const cartItems = [
    { ...products[5], qty: 9, seller: 'Artel Market' },
    { ...products[8], qty: 3, seller: 'Best factory LLC' },
    { ...products[0], qty: 1, seller: 'Artel Market' }
  ];

  return (
    <div className="cart-page container">
      <h2 className="page-title">My cart (3)</h2>

      <div className="cart-layout">
        <div className="cart-main">
          {/* Cart Items */}
          <div className="cart-items-card">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <div className="item-header">
                    <h4>{item.name}</h4>
                    <span className="item-price">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                  <p className="item-meta">Size: medium, Color: blue, Material: Plastic</p>
                  <p className="item-seller">Seller: {item.seller}</p>
                  
                  <div className="item-actions-row">
                    <div className="item-actions">
                      <button className="action-btn error-text">Remove</button>
                      <button className="action-btn text-primary">Save for later</button>
                    </div>
                    <select className="qty-select" defaultValue={item.qty}>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <option key={n} value={n}>Qty: {n}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}

            <div className="cart-bottom-actions">
              <Link to="/products" className="btn-primary with-icon">
                <ArrowLeft size={18} /> Back to shop
              </Link>
              <button className="btn-outline">Remove all</button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="badge-item">
              <div className="badge-icon"><Lock size={20} color="#8B96A5" /></div>
              <div className="badge-text">
                <h5>Secure payment</h5>
                <p>Have you ever finally just</p>
              </div>
            </div>
            <div className="badge-item">
              <div className="badge-icon"><MessageSquare size={20} color="#8B96A5" /></div>
              <div className="badge-text">
                <h5>Customer support</h5>
                <p>Have you ever finally just</p>
              </div>
            </div>
            <div className="badge-item">
              <div className="badge-icon"><Truck size={20} color="#8B96A5" /></div>
              <div className="badge-text">
                <h5>Free delivery</h5>
                <p>Have you ever finally just</p>
              </div>
            </div>
          </div>

          {/* Saved for later */}
          <section className="saved-for-later">
            <h3>Saved for later</h3>
            <div className="saved-grid">
              {products.slice(1, 5).map(p => (
                <div key={p.id} className="saved-card">
                  <div className="img-wrap">
                    <img src={p.image} alt={p.name} />
                  </div>
                  <span className="price">${p.price.toFixed(2)}</span>
                  <p className="title">{p.name}</p>
                  <button className="btn-outline full-width with-icon justify-center">
                    <ShoppingCartIcon /> Move to cart
                  </button>
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

        {/* Sidebar */}
        <div className="cart-sidebar">
          <div className="coupon-card">
            <p>Have a coupon?</p>
            <div className="coupon-input">
              <input type="text" placeholder="Add coupon" />
              <button className="btn-outline">Apply</button>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>$1403.97</span>
            </div>
            <div className="summary-row">
              <span>Discount:</span>
              <span className="text-error">- $60.00</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span className="text-success">+ $14.00</span>
            </div>
            <div className="divider"></div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>$1357.97</span>
            </div>
            <button className="btn-success full-width" style={{ marginTop: '20px', padding: '12px', fontSize: '18px' }}>
              Checkout
            </button>
            <div className="payment-methods">
              <img src="https://placehold.co/40x25/e2e8f0/64748b?text=Amex" alt="Amex" />
              <img src="https://placehold.co/40x25/e2e8f0/64748b?text=MC" alt="Mastercard" />
              <img src="https://placehold.co/40x25/e2e8f0/64748b?text=PayPal" alt="PayPal" />
              <img src="https://placehold.co/40x25/e2e8f0/64748b?text=Visa" alt="Visa" />
              <img src="https://placehold.co/40x25/e2e8f0/64748b?text=Apple" alt="Apple Pay" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mini icon component for this file
const ShoppingCartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

export default Cart;
