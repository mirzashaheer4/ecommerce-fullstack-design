const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

/**
 * Get user's cart from backend
 */
export const fetchCartApi = async (token) => {
  const res = await fetch(`${BASE_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch cart');
  return data;
};

/**
 * Add item to cart
 */
export const addToCartApi = async (token, productId, quantity = 1) => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ productId, quantity }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to add to cart');
  return data;
};

/**
 * Update cart item quantity
 */
export const updateCartItemApi = async (token, productId, quantity) => {
  const res = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify({ quantity }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update cart');
  return data;
};

/**
 * Remove item from cart
 */
export const removeFromCartApi = async (token, productId) => {
  const res = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to remove from cart');
  return data;
};

/**
 * Clear entire cart
 */
export const clearCartApi = async (token) => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to clear cart');
  return data;
};
