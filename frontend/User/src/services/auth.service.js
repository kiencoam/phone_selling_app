import axios from 'axios';
import { API_CONFIG } from '../constants/api';

// API base URL
const API_BASE_URL = API_CONFIG.BASE_URL;

// Tạo axios instance riêng cho auth service
const authClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: API_CONFIG.TIMEOUT, // 10 seconds timeout
});

// Add request interceptor for auth token
authClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    console.log(`[Auth Request] ${config.method.toUpperCase()} ${config.url}`, {
      hasToken: !!token,
    });
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('[Auth Request Error]', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
authClient.interceptors.response.use(
  (response) => {
    console.log(`[Auth Response] ${response.config.method.toUpperCase()} ${response.config.url}`, {
      status: response.status,
    });
    return response;
  },
  (error) => {
    console.error(`[Auth Error] ${error.config?.method?.toUpperCase() || 'UNKNOWN'} ${error.config?.url || 'unknown'}`, {
      status: error.response?.status,
      message: error.message,
    });
    
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      // Kiểm tra nếu đang ở trang yêu cầu xác thực
      const protectedRoutes = ['/cart', '/checkout', '/profile', '/orders'];
      const currentPath = window.location.pathname;
      
      if (protectedRoutes.some(route => currentPath.startsWith(route))) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export class AuthService {
  /**
   * Đăng nhập người dùng
   * @param {string} email - Email đăng nhập
   * @param {string} password - Mật khẩu
   * @returns {Promise<Object>} Thông tin người dùng kèm token
   */
  static async login(email, password) {
    try {
      const response = await authClient.post(API_CONFIG.ENDPOINTS.LOGIN, { email, password });
      
      // Lưu token vào localStorage
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      console.log('[Auth] Login successful', { user: response.data.user.email });
      return response.data.user;
    } catch (error) {
      console.error('[Auth] Login error:', error);
      throw error;
    }
  }

  /**
   * Đăng ký người dùng mới
   * @param {Object} userData - Thông tin người dùng
   * @returns {Promise<Object>} Thông tin người dùng đã đăng ký
   */
  static async register(userData) {
    try {
      const response = await authClient.post(API_CONFIG.ENDPOINTS.REGISTER, userData);
      console.log('[Auth] Registration successful', { user: userData.email });
      return response.data;
    } catch (error) {
      console.error('[Auth] Registration error:', error);
      throw error;
    }
  }

  /**
   * Đăng xuất người dùng
   * @returns {Promise<void>}
   */
  static async logout() {
    try {
      await authClient.post(API_CONFIG.ENDPOINTS.LOGOUT);
      
      // Xóa thông tin đăng nhập
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      console.log('[Auth] Logout successful');
    } catch (error) {
      console.error('[Auth] Logout error:', error);
      // Vẫn xóa thông tin đăng nhập nếu có lỗi
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      throw error;
    }
  }

  /**
   * Lấy thông tin người dùng hiện tại
   * @returns {Promise<Object>} Thông tin người dùng
   */
  static async fetchUserProfile() {
    try {
      const response = await authClient.get(API_CONFIG.ENDPOINTS.PROFILE);
      console.log('[Auth] Fetch user profile successful', { userId: response.data.id });
      return response.data;
    } catch (error) {
      console.error('[Auth] Fetch user profile error:', error);
      
      // Fallback để đảm bảo ứng dụng không bị crash
      const userData = localStorage.getItem('user');
      if (userData) {
        return JSON.parse(userData);
      }
      
      throw error;
    }
  }

  /**
   * Cập nhật thông tin người dùng
   * @param {Object} userData - Thông tin cần cập nhật
   * @returns {Promise<Object>} Thông tin người dùng đã cập nhật
   */
  static async updateUserProfile(userData) {
    try {
      const response = await authClient.put(API_CONFIG.ENDPOINTS.PROFILE, userData);
      
      // Cập nhật thông tin user trong localStorage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...currentUser, ...response.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      console.log('[Auth] Update user profile successful', { userId: updatedUser.id });
      return updatedUser;
    } catch (error) {
      console.error('[Auth] Update user profile error:', error);
      throw error;
    }
  }
}
