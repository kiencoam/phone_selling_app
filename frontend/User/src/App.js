import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
//import Cart from './pages/Cart';
//import Checkout from './pages/Checkout';
//import Search from './pages/Search';
//import { AuthProvider } from './contexts/AuthContext';
//import { CartProvider } from './contexts/CartContext';
import { FilterProvider } from './contexts/FilterContext';
import { PromotionProvider } from './contexts/PromotionContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <FilterProvider>
            <PromotionProvider>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="category/:categoryId" element={<Category />} />
                  <Route path="product/:productId" element={<ProductDetail />} />
    
                  <Route path="phone" element={<Category />} />
                  <Route path="laptop" element={<Category />} />
                  <Route path="accessory" element={<Category />} />
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