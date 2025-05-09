import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * ProtectedRoute - Bảo vệ các route yêu cầu đăng nhập
 * Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập với returnUrl
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log('[ProtectedRoute] Rendered', {
      path: location.pathname,
      isAuthenticated
    });
  }, [location.pathname, isAuthenticated]);

  if (!isAuthenticated) {
    console.log('[ProtectedRoute] Unauthorized access, redirecting to login', {
      from: location.pathname
    });
    
    // Thêm thông báo qua tham số state để trang login có thể hiển thị
    return <Navigate 
      to="/login" 
      state={{ 
        returnUrl: location.pathname,
        message: "Bạn cần đăng nhập để truy cập trang này" 
      }} 
      replace 
    />;
  }

  console.log('[ProtectedRoute] Authorized access', {
    path: location.pathname
  });
  
  return children;
};

export default ProtectedRoute; 