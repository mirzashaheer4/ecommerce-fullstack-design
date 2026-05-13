import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'ecommerce_cart';

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
  const [cartItems, setCartItems] = useState(loadCartFromStorage);

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item._id === product._id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + qty,
        };
        return updated;
      }
      return [
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
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, qty) => {
    if (qty < 1) return removeFromCart(productId);
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, qty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
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
