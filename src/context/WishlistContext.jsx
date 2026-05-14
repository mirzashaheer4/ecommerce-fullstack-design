import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?._id;
  
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist when user changes
  useEffect(() => {
    const key = userId ? `ecommerce_wishlist_${userId}` : 'ecommerce_wishlist_guest';
    try {
      const saved = localStorage.getItem(key);
      setWishlistItems(saved ? JSON.parse(saved) : []);
    } catch {
      setWishlistItems([]);
    }
  }, [userId]);

  const saveToStorage = useCallback((items) => {
    const key = userId ? `ecommerce_wishlist_${userId}` : 'ecommerce_wishlist_guest';
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save wishlist:', error);
    }
  }, [userId]);

  const addToWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      if (prev.some((item) => item._id === product._id)) return prev;
      const newItems = [...prev, {
        _id: product._id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images?.[0] || product.image || '',
        category: product.category,
        rating: product.rating,
      }];
      saveToStorage(newItems);
      return newItems;
    });
  }, [saveToStorage]);

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems((prev) => {
      const newItems = prev.filter((item) => item._id !== productId);
      saveToStorage(newItems);
      return newItems;
    });
  }, [saveToStorage]);

  const toggleWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item._id === product._id);
      let newItems;
      if (exists) {
        newItems = prev.filter((item) => item._id !== product._id);
      } else {
        newItems = [...prev, {
          _id: product._id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images?.[0] || product.image || '',
          category: product.category,
          rating: product.rating,
        }];
      }
      saveToStorage(newItems);
      return newItems;
    });
  }, [saveToStorage]);

  const isInWishlist = useCallback((productId) => {
    return wishlistItems.some((item) => item._id === productId);
  }, [wishlistItems]);

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;
