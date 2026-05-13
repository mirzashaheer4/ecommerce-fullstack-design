import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';
import { ArrowLeft, Lock, MessageSquare, Truck, ShoppingCart } from 'lucide-react';

const Cart = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    document.title = "My Cart | Brand eCommerce";
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page container empty-state">
        <div className="empty-cart-content">
          <div className="empty-icon-circle">
            <ShoppingCart size={48} color="#8B96A5" />
          </div>
          <h2>Your cart is empty</h2>
          <p>Browse our products and find something you love!</p>
          <Link to="/products" className="btn-primary with-icon">
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const discount = 60;
  const tax = 14;
  const subtotal = cartTotal;
  const total = subtotal - discount + tax;

  return (
    <div className="cart-page container">
      <h2 className="page-title">My cart ({cartItems.length})</h2>

      <div className="cart-layout">
        <div className="cart-main">
          {/* Cart Items */}
          <div className="cart-items-card">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
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
                      <button className="action-btn error-text" onClick={() => removeFromCart(item._id)}>Remove</button>
                      <button className="action-btn text-primary" onClick={() => alert('Item saved for later')}>Save for later</button>
                    </div>
                    <select
                      className="qty-select"
                      value={item.qty}
                      onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                    >
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
              <button className="btn-outline" onClick={clearCart}>Remove all</button>
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

          {/* Discount Banner */}
          <div className="discount-banner">
            <div className="banner-text-content">
              <h2>Super discount on more than 100 USD</h2>
              <p>Have you ever finally just write dummy info</p>
            </div>
            <Link to="/products" className="btn-secondary">Shop now</Link>
          </div>

        </div>

        {/* Sidebar */}
        <div className="cart-sidebar">
          <form className="coupon-card" onSubmit={(e) => { e.preventDefault(); alert('Coupon applied!'); }}>
            <p>Have a coupon?</p>
            <div className="coupon-input">
              <input type="text" placeholder="Add coupon" required />
              <button type="submit" className="btn-outline">Apply</button>
            </div>
          </form>

          <div className="summary-card">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Discount:</span>
              <span className="text-error">- ${discount.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span className="text-success">+ ${tax.toFixed(2)}</span>
            </div>
            <div className="divider"></div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="btn-success full-width" style={{ marginTop: '20px', padding: '12px', fontSize: '18px' }} onClick={() => alert('Proceeding to checkout...')}>
              Checkout
            </button>
            <div className="payment-methods">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" style={{ height: '24px', backgroundColor: 'white', padding: '2px', borderRadius: '4px' }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" style={{ height: '24px', backgroundColor: 'white', padding: '2px', borderRadius: '4px' }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" style={{ height: '24px', backgroundColor: 'white', padding: '2px', borderRadius: '4px' }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" style={{ height: '24px', backgroundColor: 'white', padding: '2px', borderRadius: '4px' }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" style={{ height: '24px', backgroundColor: 'white', padding: '2px', borderRadius: '4px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
