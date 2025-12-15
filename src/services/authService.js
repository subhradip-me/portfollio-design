import api, { handleApiResponse, handleApiError } from './api.js';

// Authentication Service
export const authService = {
  // Test CORS connectivity
  async testCors() {
    try {
      console.log('Testing CORS with current domain:', window.location.origin);
      
      // Try a simple fetch first to test CORS
      const response = await fetch('https://portfollio-backend-2-85n5.onrender.com/api/auth/login', {
        method: 'OPTIONS',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type,Authorization',
          'Origin': window.location.origin
        }
      });
      
      console.log('CORS test response:', {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      return response.ok;
    } catch (error) {
      console.error('CORS test failed:', error);
      return false;
    }
  },

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
      if (import.meta.env.DEV) {
        console.log('authService: making login request to', '/auth/login');
        console.log('authService: credentials', { email: credentials.email });
      }
      
      // Try Axios first
      const response = await api.post('/auth/login', credentials);
      if (import.meta.env.DEV) {
        console.log('authService: received response', response);
      }
      const data = handleApiResponse(response);
      if (import.meta.env.DEV) {
        console.log('authService: processed response data', data);
      }
      
      // Store token and user data (API returns token and user directly)
      if (data.token) {
        if (import.meta.env.DEV) {
          console.log('authService: storing token and user data');
        }
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return { success: true, data: { token: data.token, user: data.user } };
    } catch (error) {
      console.error('authService: Axios login failed, trying fetch fallback...', error);
      
      // Fallback to direct fetch if Axios fails (likely CORS issue)
      try {
        const response = await fetch('https://portfollio-backend-2-85n5.onrender.com/api/auth/login', {
          method: 'POST',
          mode: 'cors',
          credentials: 'omit',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(credentials)
        });
        
        const data = await response.json();
        
        if (response.ok && data.token) {
          console.log('authService: fetch fallback successful');
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          return { success: true, data: { token: data.token, user: data.user } };
        } else {
          throw new Error(data.error || data.message || 'Authentication failed');
        }
      } catch (fetchError) {
        console.error('authService: fetch fallback also failed', fetchError);
        const errorDetails = handleApiError(error);
        if (import.meta.env.DEV) {
          console.log('authService: processed error', errorDetails);
        }
        return { success: false, error: errorDetails };
      }
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
