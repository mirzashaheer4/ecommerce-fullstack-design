import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  fetchCartApi,
  addToCartApi,
  updateCartItemApi,
  removeFromCartApi,
  clearCartApi,
} from '../api/cartApi';

const CartContext = createContext();

const CART_STORAGE_KEY = 'ecommerce_cart';

// --- localStorage helpers (guest cart) ---
const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated, token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---- Sync cart on auth state change ----
  useEffect(() => {
    if (isAuthenticated && token) {
      // Merge localStorage cart into backend, then fetch
      mergeAndFetch();
    } else {
      // Guest: load from localStorage
      setCartItems(loadCartFromStorage());
    }
  }, [isAuthenticated, token]);

  // (Removed problematic useEffect that saved cart on auth change)

  // Merge localStorage cart into backend, then fetch fresh
  const mergeAndFetch = async () => {
    setLoading(true);
    try {
      const localItems = loadCartFromStorage();

      // Merge each localStorage item into backend (quantities ADD)
      for (const item of localItems) {
        try {
          await addToCartApi(token, item._id, item.qty);
        } catch {
          // Skip items that fail (e.g., product deleted)
        }
      }

      // Clear localStorage after merge
      if (localItems.length > 0) {
        localStorage.removeItem(CART_STORAGE_KEY);
      }

      // Fetch full cart from backend
      const data = await fetchCartApi(token);
      const backendItems = (data.cart?.items || []).map((item) => ({
        _id: item.product?._id || item.product,
        name: item.product?.name || 'Unknown',
        price: item.price,
        image: item.product?.images?.[0] || '',
        category: '',
        qty: item.quantity,
        seller: 'Marketplace Seller',
        stock: item.product?.stock,
      }));
      setCartItems(backendItems);
    } catch (error) {
      console.error('Failed to sync cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // ---- Cart operations ----
  const addToCart = useCallback(async (product, qty = 1) => {
    if (isAuthenticated && token) {
      try {
        const data = await addToCartApi(token, product._id, qty);
        const backendItems = (data.cart?.items || []).map((item) => ({
          _id: item.product?._id || item.product,
          name: item.product?.name || 'Unknown',
          price: item.price,
          image: item.product?.images?.[0] || '',
          category: '',
          qty: item.quantity,
          seller: 'Marketplace Seller',
          stock: item.product?.stock,
        }));
        setCartItems(backendItems);
      } catch (error) {
        console.error('Add to cart error:', error);
      }
    } else {
      // Guest: localStorage
      setCartItems((prev) => {
        const existingIndex = prev.findIndex((item) => item._id === product._id);
        let newItems;
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            qty: updated[existingIndex].qty + qty,
          };
          newItems = updated;
        } else {
          newItems = [
            ...prev,
            {
              _id: product._id,
              name: product.name,
              price: product.price,
              image: product.images?.[0] || product.image,
              category: product.category,
              qty,
              seller: 'Marketplace Seller',
            },
          ];
        }
        saveCartToStorage(newItems);
        return newItems;
      });
    }
  }, [isAuthenticated, token]);

  const removeFromCart = useCallback(async (productId) => {
    if (isAuthenticated && token) {
      try {
        const data = await removeFromCartApi(token, productId);
        const backendItems = (data.cart?.items || []).map((item) => ({
          _id: item.product?._id || item.product,
          name: item.product?.name || 'Unknown',
          price: item.price,
          image: item.product?.images?.[0] || '',
          category: '',
          qty: item.quantity,
          seller: 'Marketplace Seller',
          stock: item.product?.stock,
        }));
        setCartItems(backendItems);
      } catch (error) {
        console.error('Remove from cart error:', error);
      }
    } else {
      setCartItems((prev) => {
        const newItems = prev.filter((item) => item._id !== productId);
        saveCartToStorage(newItems);
        return newItems;
      });
    }
  }, [isAuthenticated, token]);

  const updateQuantity = useCallback(async (productId, qty) => {
    if (qty < 1) return removeFromCart(productId);

    if (isAuthenticated && token) {
      try {
        const data = await updateCartItemApi(token, productId, qty);
        const backendItems = (data.cart?.items || []).map((item) => ({
          _id: item.product?._id || item.product,
          name: item.product?.name || 'Unknown',
          price: item.price,
          image: item.product?.images?.[0] || '',
          category: '',
          qty: item.quantity,
          seller: 'Marketplace Seller',
          stock: item.product?.stock,
        }));
        setCartItems(backendItems);
      } catch (error) {
        console.error('Update quantity error:', error);
      }
    } else {
      setCartItems((prev) => {
        const newItems = prev.map((item) =>
          item._id === productId ? { ...item, qty } : item
        );
        saveCartToStorage(newItems);
        return newItems;
      });
    }
  }, [isAuthenticated, token, removeFromCart]);

  const clearCart = useCallback(async () => {
    if (isAuthenticated && token) {
      try {
        await clearCartApi(token);
        setCartItems([]);
      } catch (error) {
        console.error('Clear cart error:', error);
      }
    } else {
      setCartItems([]);
      saveCartToStorage([]);
    }
  }, [isAuthenticated, token]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
