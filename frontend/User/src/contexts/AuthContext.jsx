import React, { createContext, useState, useEffect } from 'react';
import { ApiService } from '../services/api.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if there's a stored user in localStorage
    const initAuth = async () => {
      setLoading(true);
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          // Validate the token with the backend
          // In a real app, you might want to validate the token with the backend
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (err) {
        console.error('Authentication initialization error:', err);
        setError('Failed to initialize authentication');
        // Clear potentially corrupted data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await ApiService.login(email, password);
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await ApiService.register(userData);
      return result;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await ApiService.logout();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError(err.message || 'Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await ApiService.updateUserProfile(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 