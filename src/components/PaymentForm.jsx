import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { confirmOrder } from '../api/paymentApi';
import { useSettings } from '../context/SettingsContext';

const PaymentForm = ({ paymentData, deliveryInfo, onBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { formatPrice } = useSettings();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message);
      setLoading(false);
      return;
    }

    // Confirm Payment
    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/order-confirmation',
      },
      redirect: 'if_required',
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      try {
        const { order } = await confirmOrder({
          orderId: paymentData.orderId,
          paymentIntentId: paymentIntent.id
        });
        setSuccess(true);
        setTimeout(() => {
          navigate('/order-confirmation', { state: { order } });
        }, 1000);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to confirm order on server');
        setLoading(false);
      }
    } else {
      setError('Payment status is: ' + paymentIntent?.status);
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: '30px', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* Order Summary (Read Only) */}
        <div style={{ flex: '1 1 300px', paddingRight: '20px', borderRight: '1px solid #e5e7eb' }}>
          <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', marginBottom: '8px' }}>
              <span>Subtotal</span>
              <span>{formatPrice(paymentData.subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', marginBottom: '8px' }}>
              <span>Shipping</span>
              <span>{paymentData.shippingCost === 0 ? 'Free' : formatPrice(paymentData.shippingCost)}</span>
            </div>
            {paymentData.discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ef4444', marginBottom: '8px' }}>
                <span>Discount</span>
                <span>-{formatPrice(paymentData.discount)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e5e7eb' }}>
              <span>Total</span>
              <span>{formatPrice(paymentData.total)}</span>
            </div>
          </div>
          
          <div style={{ marginTop: '30px' }}>
            <h4 style={{ marginBottom: '10px', fontSize: '14px', color: '#6b7280' }}>Delivery To:</h4>
            <p style={{ margin: 0, fontWeight: '500' }}>{deliveryInfo.fullName}</p>
            <p style={{ margin: '4px 0', color: '#6b7280', fontSize: '14px' }}>{deliveryInfo.address}, {deliveryInfo.city}</p>
          </div>
        </div>

        {/* Card Input Section */}
        <div style={{ flex: '1 1 350px' }}>
          <h3 style={{ marginBottom: '20px' }}>Payment Details</h3>
          <form onSubmit={handleSubmit}>
            <PaymentElement />
            
            {error && (
              <div style={{ color: '#ef4444', marginTop: '12px', fontSize: '14px', padding: '10px', background: '#fee2e2', borderRadius: '6px' }}>
                {error}
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={!stripe || loading || success}
              className="full-width"
              style={{ 
                marginTop: '25px', 
                padding: '14px', 
                fontSize: '16px', 
                borderRadius: '8px',
                border: 'none',
                color: '#fff',
                cursor: (loading || success || !stripe) ? 'not-allowed' : 'pointer',
                background: success ? '#10b981' : 'var(--color-primary)',
                transition: 'all 0.3s'
              }}
            >
              {loading ? (
                <span>Processing...</span>
              ) : success ? (
                <span>✓ Payment Successful</span>
              ) : (
                `Pay ${formatPrice(paymentData.total)} Now`
              )}
            </button>
            
            <button 
              type="button" 
              onClick={onBack}
              disabled={loading || success}
              style={{ 
                marginTop: '15px', 
                padding: '10px', 
                width: '100%', 
                background: 'transparent', 
                border: 'none', 
                color: '#6b7280', 
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              ← Back to Delivery
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default PaymentForm;
