import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const WishlistContext = createContext();

const WISHLIST_KEY = 'ecommerce_wishlist';

const loadWishlist = () => {
  try {
    const saved = localStorage.getItem(WISHLIST_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(loadWishlist);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Failed to save wishlist:', error);
    }
  }, [wishlistItems]);

  const addToWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      if (prev.some((item) => item._id === product._id)) return prev;
      return [...prev, {
        _id: product._id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images?.[0] || product.image || '',
        category: product.category,
        rating: product.rating,
      }];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
  }, []);

  const toggleWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item._id === product._id);
      if (exists) {
        return prev.filter((item) => item._id !== product._id);
      }
      return [...prev, {
        _id: product._id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images?.[0] || product.image || '',
        category: product.category,
        rating: product.rating,
      }];
    });
  }, []);

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
