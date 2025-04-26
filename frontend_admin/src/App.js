import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import CategoryManagement from './pages/categories/CategoryManagement';
import BrandManagement from './pages/brands/BrandManagement';
import ProductLineManagement from './pages/products/ProductLineManagement';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Route public */}
        <Route path="/login" element={<Login />} />
        
        {/* Routes được bảo vệ */}
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="brands" element={<BrandManagement />} />
          <Route path="products" element={<ProductLineManagement />} />
          <Route path="orders" element={<div className="p-4">Trang Đơn hàng - Đang phát triển</div>} />
          <Route path="promotions" element={<div className="p-4">Trang Khuyến mãi - Đang phát triển</div>} />
          <Route path="customers" element={<div className="p-4">Trang Khách hàng - Đang phát triển</div>} />
        </Route>
        
        {/* Redirect các đường dẫn khác về trang chủ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App; 