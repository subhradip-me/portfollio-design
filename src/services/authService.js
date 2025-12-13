import api, { handleApiResponse, handleApiError } from './api.js';

// Authentication Service
export const authService = {
  // Register new user (admin)
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      const data = handleApiResponse(response);
      
      // Store token and user data
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return { success: true, data };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Login user
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const data = handleApiResponse(response);
      
      // Store token and user data
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return { success: true, data };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Get current user profile
  async getProfile() {
    try {
      const response = await api.get('/auth/me');
      const data = handleApiResponse(response);
      
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return { success: true, data };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await api.put('/auth/profile', profileData);
      const data = handleApiResponse(response);
      
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return { success: true, data };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await api.put('/auth/change-password', passwordData);
      const data = handleApiResponse(response);
      
      return { success: true, data };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/admin/login';
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Get current user from localStorage
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get auth token
  getToken() {
    return localStorage.getItem('token');
  }
};
