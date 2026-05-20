import React, { createContext, useContext, useState, useCallback } from 'react';
import ErrorToast from '../ui/ErrorToast/ErrorToast';
import SuccessToast from '../ui/SuccessToast/SuccessToast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null); 

  const showToast = useCallback((title, message, type = 'error') => {
    setToast({ title, message, type });
    
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
          {toast.type === 'success' ? (
            <SuccessToast 
              title={toast.title} 
              message={toast.message} 
              onClose={hideToast} 
            />
          ) : (
            <ErrorToast 
              title={toast.title} 
              message={toast.message} 
              onClose={hideToast} 
            />
          )}
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
