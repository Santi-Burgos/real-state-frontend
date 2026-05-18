import React, { createContext, useContext, useState, useCallback } from 'react';
import ErrorToast from '../ui/ErrorToast/ErrorToast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null); 

  const showToast = useCallback((title, message) => {
    setToast({ title, message });
    
    setTimeout(() => {
      setToast(null);
    }, 5000);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="toast-portal-wrapper">
          <ErrorToast 
            title={toast.title} 
            message={toast.message} 
            onClose={hideToast} 
          />
        </div>
      )}
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
