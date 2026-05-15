const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const createPaymentIntent = async (data, token = null) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const res = await fetch(`${BASE_URL}/payment/create-intent`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.message || 'Failed to create payment intent');
  return resData;
};

export const confirmOrder = async (data) => {
  const res = await fetch(`${BASE_URL}/payment/confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.message || 'Failed to confirm order');
  return resData;
};

export const fetchMyOrders = async (token) => {
  const res = await fetch(`${BASE_URL}/payment/my-orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch orders');
  return data;
};

export const fetchOrderById = async (id, token) => {
  const res = await fetch(`${BASE_URL}/payment/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch order');
  return data;
};
