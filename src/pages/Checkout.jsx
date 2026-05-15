import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createPaymentIntent } from '../api/paymentApi';
import PaymentForm from '../components/PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { cartItems } = useCart();
  const { isAuthenticated, token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const couponDiscount = location.state?.couponDiscount || 0;

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Pakistan'
  });

  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    document.title = "Checkout | E-commerce Store";
    if (!isAuthenticated && !deliveryInfo.email) {
       // Guest checkout is allowed, but maybe we could pre-fill if authenticated?
    }
  }, [isAuthenticated, deliveryInfo.email]);

  useEffect(() => {
    if (cartItems.length === 0 && step === 1) {
      navigate('/cart');
    }
  }, [cartItems, navigate, step]);

  const handleInputChange = (e) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };

  const handleDeliverySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const items = cartItems.map(item => ({
        product: item._id,
        name: item.name,
        price: item.price,
        qty: item.qty
      }));

      const data = await createPaymentIntent({
        items,
        deliveryInfo,
        couponDiscount
      }, token);

      setPaymentData(data);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to initialize payment');
    } finally {
      setLoading(false);
    }
  };

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#0D6EFD',
      colorBackground: '#ffffff',
      colorText: '#1a1a1a',
      colorDanger: '#e24b4a',
      fontFamily: getComputedStyle(document.documentElement).getPropertyValue('--font-family-primary').trim() || 'Inter, sans-serif',
      borderRadius: '8px',
    }
  };

  return (
    <div className="container page-animate" style={{ maxWidth: '800px', margin: '40px auto', minHeight: '60vh' }}>
      <h2 className="page-title">Checkout</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ flex: 1, padding: '15px', background: step === 1 ? 'var(--color-primary)' : '#e5e7eb', color: step === 1 ? '#fff' : '#6b7280', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', transition: 'all 0.3s' }}>
          1. Delivery Details
        </div>
        <div style={{ flex: 1, padding: '15px', background: step === 2 ? 'var(--color-primary)' : '#e5e7eb', color: step === 2 ? '#fff' : '#6b7280', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', transition: 'all 0.3s' }}>
          2. Payment
        </div>
      </div>

      {error && <div style={{ background: '#fee2e2', color: '#ef4444', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}

      {step === 1 && (
        <div className="card" style={{ padding: '30px', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <form onSubmit={handleDeliverySubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Full Name</label>
                <input type="text" name="fullName" required value={deliveryInfo.fullName} onChange={handleInputChange} style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email Address {!isAuthenticated && '(Required for guests)'}</label>
                <input type="email" name="email" required value={deliveryInfo.email} onChange={handleInputChange} style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Phone Number</label>
                <input type="tel" name="phone" required value={deliveryInfo.phone} onChange={handleInputChange} style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Country</label>
                <select name="country" value={deliveryInfo.country} onChange={handleInputChange} style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}>
                  <option value="Pakistan">Pakistan</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Street Address</label>
              <input type="text" name="address" required value={deliveryInfo.address} onChange={handleInputChange} style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>City</label>
              <input type="text" name="city" required value={deliveryInfo.city} onChange={handleInputChange} style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            </div>

            <button type="submit" className="btn-primary full-width" disabled={loading} style={{ padding: '14px', fontSize: '16px' }}>
              {loading ? 'Processing...' : 'Continue to Payment'}
            </button>
          </form>
        </div>
      )}

      {step === 2 && paymentData && (
        <Elements stripe={stripePromise} options={{ clientSecret: paymentData.clientSecret, appearance }}>
          <PaymentForm 
            paymentData={paymentData} 
            deliveryInfo={deliveryInfo}
            onBack={() => setStep(1)} 
          />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
