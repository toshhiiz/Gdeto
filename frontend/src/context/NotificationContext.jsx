import React, { createContext, useContext, useCallback } from 'react';
import { toast } from 'react-toastify';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const showSuccess = useCallback((message, options = {}) => {
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 2000,
      ...options,
    });
  }, []);

  const showError = useCallback((message, options = {}) => {
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 3000,
      ...options,
    });
  }, []);

  const showInfo = useCallback((message, options = {}) => {
    toast.info(message, {
      position: 'bottom-right',
      autoClose: 2000,
      ...options,
    });
  }, []);

  const showWarning = useCallback((message, options = {}) => {
    toast.warning(message, {
      position: 'bottom-right',
      autoClose: 2000,
      ...options,
    });
  }, []);

  const value = {
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};
