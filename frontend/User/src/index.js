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
import { FilterProvider } from './contexts/FilterContext';
import { PromotionProvider } from './contexts/PromotionContext';
import logger from './utils/logger';

// Khởi tạo logger
if (process.env.NODE_ENV === 'production') {
  logger.disable();
} else {
  logger.enable();
  logger.ui.debug('Thông tin môi trường', {
    nodeEnv: process.env.NODE_ENV,
    buildVersion: process.env.REACT_APP_VERSION || 'dev',
    apiUrl: process.env.REACT_APP_API_URL,
  });
}

logger.ui.info('Ứng dụng đã được khởi tạo');

// Tạo root container
const root = createRoot(document.getElementById('root'));

// Bọc RouterProvider với tất cả các Context Providers
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <FilterProvider>
            <PromotionProvider>
              {/* Đảm bảo RouterProvider được bọc trong tất cả các Context */}
              <RouterProvider router={router} />
            </PromotionProvider>
          </FilterProvider>
        </CartProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
