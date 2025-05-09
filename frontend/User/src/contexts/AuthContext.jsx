import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ApiService } from '../services/api';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [token, setToken] = useLocalStorage('authToken', null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ghi log khi khởi tạo context
  useEffect(() => {
    console.log('[AuthContext] Initialized', { 
      isAuthenticated: !!user,
      user: user ? { id: user.id, email: user.email } : null
    });
  }, []);

  // Ghi log khi trạng thái thay đổi
  useEffect(() => {
    console.log('[AuthContext] Auth state changed', { 
      isAuthenticated: !!user,
      user: user ? { id: user.id, email: user.email } : null
    });
  }, [user, token]);

  const login = async (email, password) => {
    console.log('[AuthContext] login - start', { email });
    setLoading(true);
    setError(null);
    
    try {
      const response = await ApiService.login(email, password);
      console.log('[AuthContext] login - success', { userId: response.id });
      setUser(response.user);
      setToken(response.token);
      return response;
    } catch (err) {
      console.error('[AuthContext] login - error', err);
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    console.log('[AuthContext] logout - start');
    setLoading(true);
    
    try {
      await ApiService.logout();
      console.log('[AuthContext] logout - success');
      setUser(null);
      setToken(null);
    } catch (err) {
      console.error('[AuthContext] logout - error', err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    console.log('[AuthContext] register - start', { email: userData.email });
    setLoading(true);
    setError(null);
    
    try {
      const response = await ApiService.register(userData);
      console.log('[AuthContext] register - success');
      setUser(response.user);
      setToken(response.token);
      return response;
    } catch (err) {
      console.error('[AuthContext] register - error', err);
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 