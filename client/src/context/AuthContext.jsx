import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const hideToast = () => setToastMessage(null);

  // Initialize and verify user on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await api.get('/auth/me');
          if (response.data.success && response.data.user) {
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
        } catch (error) {
          console.warn('Session verification failed:', error?.response?.data?.message || error.message);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Save session helper
  const handleAuthSuccess = (newToken, newUser, successMsg) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    if (successMsg) {
      showToast(successMsg, 'success');
    }
  };

  // Register with email & password
  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const { token: newToken, user: newUser, message } = response.data;
      handleAuthSuccess(newToken, newUser, message || 'Account registered successfully!');
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      showToast(message, 'error');
      return { success: false, message };
    }
  };

  // Login with email & password
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token: newToken, user: newUser, message } = response.data;
      handleAuthSuccess(newToken, newUser, message || 'Logged in successfully!');
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid email or password';
      showToast(message, 'error');
      return { success: false, message };
    }
  };

  // Google Login / Signup
  const googleLogin = async (credential, fallbackUserInfo = null) => {
    try {
      const payload = credential ? { credential } : { userInfo: fallbackUserInfo };
      const response = await api.post('/auth/google', payload);
      const { token: newToken, user: newUser, message } = response.data;
      handleAuthSuccess(newToken, newUser, message || 'Google authentication successful!');
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Google authentication failed.';
      showToast(message, 'error');
      return { success: false, message };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore API logout error if any
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      showToast('You have been logged out.', 'info');
    }
  };

  // Update profile
  const updateProfile = async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      if (response.data.success && response.data.user) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        showToast('Profile updated successfully!', 'success');
        return { success: true, user: response.data.user };
      }
      return { success: false, message: 'Failed to update profile' };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile';
      showToast(message, 'error');
      return { success: false, message };
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await api.put('/auth/change-password', { currentPassword, newPassword });
      showToast('Password changed successfully!', 'success');
      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to change password';
      showToast(message, 'error');
      return { success: false, message };
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    loading,
    toastMessage,
    showToast,
    hideToast,
    register,
    login,
    googleLogin,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
