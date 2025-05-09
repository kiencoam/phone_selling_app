import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import authUtils from '../../utils/auth';
import logger from '../../utils/logger';

/**
 * RoleBasedRoute - Bảo vệ route dựa trên vai trò người dùng
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children - React elements to render if user has permission
 * @param {string|string[]} props.requiredRoles - Role hoặc mảng các role cần có để truy cập
 * @param {boolean} props.requireAll - Nếu true, user cần có tất cả các role; nếu false, chỉ cần 1 trong số đó
 * @param {string} props.redirectTo - URL chuyển hướng khi không có quyền (mặc định: /login)
 * @param {string} props.unauthorizedMessage - Thông báo hiển thị khi không có quyền
 */
const RoleBasedRoute = ({ 
  children, 
  requiredRoles, 
  requireAll = false,
  redirectTo = '/login',
  unauthorizedMessage = 'Bạn không có quyền truy cập trang này'
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Convert to array if a single role is provided
  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

  useEffect(() => {
    logger.route.debug('RoleBasedRoute rendered', { 
      path: location.pathname, 
      requiredRoles: roles,
      requireAll,
      isAuthenticated
    });
  }, [location.pathname, roles, requireAll, isAuthenticated]);

  // Kiểm tra đăng nhập trước
  if (!isAuthenticated) {
    logger.route.info('User not authenticated, redirecting to login', { from: location.pathname });
    return <Navigate 
      to={redirectTo} 
      state={{ 
        returnUrl: location.pathname,
        message: 'Bạn cần đăng nhập để truy cập trang này'
      }} 
      replace 
    />;
  }

  // Kiểm tra vai trò
  const hasPermission = requireAll 
    ? authUtils.hasAllRoles(roles)
    : authUtils.hasAnyRole(roles);

  if (!hasPermission) {
    logger.route.warn('User does not have required roles', { 
      requiredRoles: roles,
      userRoles: authUtils.getUserRoles() || []
    });
    
    return <Navigate 
      to={redirectTo} 
      state={{ 
        returnUrl: location.pathname,
        message: unauthorizedMessage
      }} 
      replace 
    />;
  }

  logger.route.info('User has required roles, allowing access', { 
    path: location.pathname
  });
  
  return children;
};

export default RoleBasedRoute; 