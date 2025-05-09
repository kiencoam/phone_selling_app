/**
 * Auth utility - Cung cấp các hàm tiện ích xử lý xác thực,
 * tách ra riêng khỏi AuthContext để giảm kích thước và tăng khả năng tái sử dụng
 */
import logger from './logger';

// Token management
const TOKEN_KEY = 'authToken';
const USER_KEY = 'user';

/**
 * Lưu token và user vào localStorage
 * @param {string} token - JWT token
 * @param {object} user - User data
 */
export const saveAuth = (token, user) => {
  logger.auth.debug('Saving auth data to localStorage', { userId: user?.id });
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return true;
  } catch (error) {
    logger.auth.error('Error saving auth data', error);
    return false;
  }
};

/**
 * Xóa token và user khỏi localStorage
 */
export const clearAuth = () => {
  logger.auth.debug('Clearing auth data from localStorage');
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return true;
  } catch (error) {
    logger.auth.error('Error clearing auth data', error);
    return false;
  }
};

/**
 * Lấy token từ localStorage
 * @returns {string|null} JWT token or null if not found
 */
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    logger.auth.error('Error getting token', error);
    return null;
  }
};

/**
 * Lấy thông tin user từ localStorage
 * @returns {object|null} User object or null if not found
 */
export const getUser = () => {
  try {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    logger.auth.error('Error getting user data', error);
    return null;
  }
};

/**
 * Kiểm tra user đã đăng nhập chưa
 * @returns {boolean} True if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken() && !!getUser();
};

/**
 * Parse JWT token để lấy thông tin
 * @param {string} token - JWT token
 * @returns {object|null} Parsed token payload or null if invalid
 */
export const parseToken = (token) => {
  if (!token) return null;
  
  try {
    // Tách phần payload của JWT token (phần thứ 2)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    logger.auth.error('Error parsing JWT token', error);
    return null;
  }
};

/**
 * Kiểm tra token đã hết hạn chưa
 * @returns {boolean} True if token is expired or invalid
 */
export const isTokenExpired = () => {
  const token = getToken();
  if (!token) return true;
  
  try {
    const payload = parseToken(token);
    if (!payload || !payload.exp) return true;
    
    // Kiểm tra thời gian hết hạn
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= expirationTime;
  } catch (error) {
    logger.auth.error('Error checking token expiration', error);
    return true;
  }
};

/**
 * Trích xuất vai trò của user từ JWT token
 * @returns {Array<string>|null} User roles or null if not found
 */
export const getUserRoles = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const payload = parseToken(token);
    return payload?.roles || [];
  } catch (error) {
    logger.auth.error('Error getting user roles', error);
    return null;
  }
};

/**
 * Kiểm tra user có quyền truy cập không
 * @param {string} requiredRole - Role cần thiết
 * @returns {boolean} True if user has required role
 */
export const hasRole = (requiredRole) => {
  const roles = getUserRoles();
  if (!roles) return false;
  
  logger.auth.debug('Checking user role', { requiredRole, userRoles: roles });
  return roles.includes(requiredRole);
};

/**
 * Kiểm tra user có ít nhất một trong những quyền cần thiết không
 * @param {Array<string>} requiredRoles - Các role cần thiết
 * @returns {boolean} True if user has any required role
 */
export const hasAnyRole = (requiredRoles) => {
  const roles = getUserRoles();
  if (!roles) return false;
  
  logger.auth.debug('Checking user roles', { requiredRoles, userRoles: roles });
  return requiredRoles.some(role => roles.includes(role));
};

/**
 * Kiểm tra user có tất cả các quyền cần thiết không
 * @param {Array<string>} requiredRoles - Các role cần thiết
 * @returns {boolean} True if user has all required roles
 */
export const hasAllRoles = (requiredRoles) => {
  const roles = getUserRoles();
  if (!roles) return false;
  
  logger.auth.debug('Checking user has all roles', { requiredRoles, userRoles: roles });
  return requiredRoles.every(role => roles.includes(role));
};

/**
 * Lấy thông tin chi tiết về phiên đăng nhập
 * @returns {object} Session info
 */
export const getSessionInfo = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const payload = parseToken(token);
    const user = getUser();
    
    return {
      isAuthenticated: true,
      user,
      roles: payload?.roles || [],
      expiresAt: payload?.exp ? new Date(payload.exp * 1000) : null,
      isExpired: isTokenExpired(),
    };
  } catch (error) {
    logger.auth.error('Error getting session info', error);
    return null;
  }
};

export default {
  saveAuth,
  clearAuth,
  getToken,
  getUser,
  isAuthenticated,
  parseToken,
  isTokenExpired,
  getUserRoles,
  hasRole,
  hasAnyRole,
  hasAllRoles,
  getSessionInfo
}; 