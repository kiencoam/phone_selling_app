import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../services/api';

// Tạo context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm để lưu thông tin user hiện tại vào localStorage
  const saveUserToLocalStorage = (user) => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  };

  // Hàm để lấy thông tin user từ localStorage
  const getUserFromLocalStorage = () => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
        return null;
      }
    }
    return null;
  };

  // Thiết lập currentUser với function để cập nhật cả state và localStorage
  const setCurrentUserWithStorage = (user) => {
    setCurrentUser(user);
    saveUserToLocalStorage(user);
  };

  useEffect(() => {
    // Kiểm tra token trong localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // Decode token để kiểm tra hết hạn
        const decodedToken = jwtDecode(token);
        
        // Kiểm tra token đã hết hạn chưa
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token hết hạn, xóa khỏi localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
          setCurrentUser(null);
          setLoading(false);
        } else {
          // Token còn hạn
          // Trước tiên kiểm tra xem có thông tin user trong localStorage không
          const savedUser = getUserFromLocalStorage();
          
          if (savedUser) {
            // Nếu có user trong localStorage, sử dụng nó
            console.log('Using saved user from localStorage:', savedUser);
            setCurrentUser(savedUser);
            setLoading(false);
          } else {
            // Nếu không có, gọi API để lấy thông tin
            fetchUserInfo();
          }
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  // Hàm lấy thông tin người dùng từ API
  const fetchUserInfo = async () => {
    try {
      const response = await authService.getCurrentUser();
      setCurrentUserWithStorage(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user info:', error);
      // Nếu API bị lỗi nhưng token vẫn còn hạn, vẫn giữ trạng thái đăng nhập
      // với thông tin user giả
      const defaultUser = {
        id: 1,
        email: "staff@example.com",
        fullName: "Nhân viên TGDĐ",
        isActive: true
      };
      setCurrentUserWithStorage(defaultUser);
      setLoading(false);
    }
  };

  // Hàm đăng nhập
  const login = async (email, password) => {
    try {
      setError(null);
      console.log('login', email, password);
      // Thực hiện login call
      const response = await authService.login(email, password);
      console.log('response', response);
      // Kiểm tra response
      if (response && response.data && response.data.token) {
        // Lưu token vào localStorage
        localStorage.setItem('token', response.data.token);
        
        // Đặt currentUser mặc định để kích hoạt chuyển hướng ngay lập tức
        const defaultUser = {
          id: 1,
          email,
          fullName: "Nhân viên TGDĐ",
          isActive: true
        };
        setCurrentUserWithStorage(defaultUser);
        
        setLoading(false);
        return true;
      } else {
        setError("Không thể đăng nhập. Token không hợp lệ.");
        return false;
      }
    } catch (error) {
      console.error('Login error: 22222', error);
      // Xử lý lỗi từ API
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Đăng nhập thất bại");
      } else {
        setError("Không thể kết nối đến máy chủ");
      }
      return false;
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  // Cập nhật thông tin người dùng (đổi tên)
  const updateProfile = async (fullName) => {
    try {
      console.log('[AUTH CONTEXT] Bắt đầu cập nhật tên người dùng thành:', fullName);
      
      // Gọi API cập nhật thông tin
      const result = await authService.updateProfile(fullName);
      console.log('[AUTH CONTEXT] Kết quả API cập nhật tên:', result);
      
      if (result.success) {
        // Cập nhật thông tin người dùng trong state
        setCurrentUser(prev => {
          const updatedUser = { ...prev, fullName };
          console.log('[AUTH CONTEXT] Cập nhật state currentUser thành:', updatedUser);
          
          // Lưu thông tin người dùng vào localStorage
          try {
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            console.log('[AUTH CONTEXT] Đã lưu thông tin người dùng vào localStorage');
          } catch (err) {
            console.error('[AUTH CONTEXT] Lỗi khi lưu thông tin người dùng vào localStorage:', err);
          }
          
          return updatedUser;
        });
        
        return { success: true };
      } else {
        console.error('[AUTH CONTEXT] API trả về lỗi:', result);
        return { success: false, message: result.message || 'Không thể cập nhật thông tin' };
      }
    } catch (error) {
      console.error('[AUTH CONTEXT] Lỗi khi cập nhật tên người dùng:', error);
      
      // Thử cập nhật local state để cải thiện trải nghiệm người dùng
      try {
        setCurrentUser(prev => {
          const updatedUser = { ...prev, fullName };
          console.log('[AUTH CONTEXT] Cập nhật state currentUser (mặc dù API lỗi) thành:', updatedUser);
          
          // Lưu thông tin vào localStorage để duy trì giữa các phiên
          try {
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            console.log('[AUTH CONTEXT] Đã lưu thông tin người dùng vào localStorage (mặc dù API lỗi)');
          } catch (err) {
            console.error('[AUTH CONTEXT] Lỗi khi lưu thông tin người dùng vào localStorage:', err);
          }
          
          return updatedUser;
        });
        
        return { success: true, message: 'Đã cập nhật thông tin (lưu cục bộ)' };
      } catch (localError) {
        console.error('[AUTH CONTEXT] Lỗi khi cập nhật thông tin cục bộ:', localError);
      }
      
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Đã xảy ra lỗi khi cập nhật thông tin'
      };
    }
  };

  // Cập nhật mật khẩu
  const updatePassword = async (oldPassword, newPassword) => {
    try {
      console.log('[AUTH CONTEXT] Bắt đầu cập nhật mật khẩu, độ dài mật khẩu mới:', newPassword.length);
      
      // Gọi API cập nhật mật khẩu
      const result = await authService.updatePassword(oldPassword, newPassword);
      console.log('[AUTH CONTEXT] Kết quả API cập nhật mật khẩu:', result);
      
      if (result.success) {
        return { success: true };
      } else {
        console.error('[AUTH CONTEXT] API trả về lỗi:', result);
        return { success: false, message: result.message || 'Không thể cập nhật mật khẩu' };
      }
    } catch (error) {
      console.error('[AUTH CONTEXT] Lỗi khi cập nhật mật khẩu:', error);
      console.error('[AUTH CONTEXT] Chi tiết lỗi:', error.response?.data);
      
      // Trả về thông báo lỗi chi tiết
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Đã xảy ra lỗi khi cập nhật mật khẩu';
      
      console.log('[AUTH CONTEXT] Thông báo lỗi trả về cho UI:', errorMessage);
                          
      return {
        success: false,
        message: errorMessage
      };
    }
  };

  // Giá trị context
  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    updateProfile,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 