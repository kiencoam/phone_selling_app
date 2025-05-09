import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Search from './pages/Search';
import Login from './pages/Account/Login';
import Register from './pages/Account/Register';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { FilterProvider } from './contexts/FilterContext';
import { PromotionProvider } from './contexts/PromotionContext';
import AllPromotions from './pages/Promotion/AllPromotions';
import PromotionDetail from './pages/Promotion/PromotionDetail';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';
import logger from './utils/logger';

function App() {
  useEffect(() => {
    logger.ui.info('App initialized');
    
    // Disable logger in production, enable in development
    if (process.env.NODE_ENV === 'production') {
      logger.disable();
    } else {
      logger.enable();
      // Log environment info
      logger.ui.debug('Environment information', {
        nodeEnv: process.env.NODE_ENV,
        buildVersion: process.env.REACT_APP_VERSION || 'dev',
        apiUrl: process.env.REACT_APP_API_URL,
      });
    }
    
    // Cleanup on unmount (though App rarely unmounts)
    return () => {
      logger.ui.info('App unmounted');
    };
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <FilterProvider>
            <PromotionProvider>
              <Routes>
                <Route path="/" element={<MainLayout />} errorElement={<ErrorBoundary />}>
                  <Route index element={<Home />} errorElement={<ErrorBoundary />} />
                  <Route path="category/:categoryId" element={<Category />} errorElement={<ErrorBoundary />} />
                  <Route path="product/:productId" element={<ProductDetail />} errorElement={<ErrorBoundary />} />
                  <Route path="search" element={<Search />} errorElement={<ErrorBoundary />} />
                  <Route path="promotion" element={<AllPromotions />} errorElement={<ErrorBoundary />} />
                  <Route path="promotion/:promoId" element={<PromotionDetail />} errorElement={<ErrorBoundary />} />
                  <Route path="phone" element={<Category />} errorElement={<ErrorBoundary />} />
                  <Route path="laptop" element={<Category />} errorElement={<ErrorBoundary />} />
                  <Route path="accessory" element={<Category />} errorElement={<ErrorBoundary />} />
                  
                  {/* Trang đăng nhập/đăng ký */}
                  <Route path="login" element={<Login />} errorElement={<ErrorBoundary />} />
                  <Route path="register" element={<Register />} errorElement={<ErrorBoundary />} />
                  
                  {/* Trang yêu cầu đăng nhập */}
                  <Route path="cart" element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  } errorElement={<ErrorBoundary />} />
                  
                  <Route path="checkout" element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } errorElement={<ErrorBoundary />} />
                  
                  {/* Catch-all route cho 404 */}
                  <Route path="*" element={<ErrorBoundary />} />
                </Route>
              </Routes>
            </PromotionProvider>
          </FilterProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;