import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext();

let toastIdCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  const removeToast = useCallback((id) => {
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = ++toastIdCounter;

    setToasts((prev) => {
      // Max 3 toasts — remove oldest if at limit
      const next = prev.length >= 3 ? prev.slice(1) : prev;
      return [...next, { id, message, type }];
    });

    timersRef.current[id] = setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;
