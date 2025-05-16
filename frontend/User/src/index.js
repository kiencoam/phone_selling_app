import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import router from './route';
import { store } from './store/store';
import './styles/global.css';

// Import các Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import logger from './utils/logger';

// Khởi tạo logger
if (process.env.NODE_ENV === 'production') {
  logger.disable();
} else {
  logger.enable();
  logger.ui.debug('Environment information', {
    nodeEnv: process.env.NODE_ENV,
    buildVersion: process.env.REACT_APP_VERSION || 'dev',
    apiUrl: process.env.REACT_APP_API_URL,
  });
}

logger.ui.info('App initialized');

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);