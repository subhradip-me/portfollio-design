import axios from 'axios';

// API Configuration - handles both development and production
const getApiBaseUrl = () => {
  // In production, always use the full backend URL
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_BASE_URL || 'https://portfollio-backend-2-85n5.onrender.com/api';
  }
  // In development, use proxy to avoid CORS issues
  return '/api';
};

const API_BASE_URL = getApiBaseUrl();

// Only log in development
if (import.meta.env.DEV) {
  console.log('API Base URL configured as:', API_BASE_URL);
  console.log('Development mode:', import.meta.env.DEV);
} else {
  // Log once in production for debugging
  console.log('Production API URL:', API_BASE_URL);
}

/**
 * Main Axios instance for API calls
 * Includes automatic token handling and error processing
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increased timeout for slower connections
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Add CORS configuration for production
  withCredentials: false,
});

// Add request interceptor to log API calls in production
if (import.meta.env.PROD) {
  api.interceptors.request.use(
    (config) => {
      console.log('Making API request to:', config.baseURL + config.url);
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );
}

/**
 * Request interceptor - Automatically adds JWT token to requests
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - Handles common API responses and errors
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - remove token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    } else if (error.response?.status === 403) {
      console.error('Forbidden: Insufficient permissions');
    } else if (error.response?.status === 429) {
      console.error('Rate limit exceeded. Please try again later.');
    }
    
    return Promise.reject(error);
  }
);

export default api;

// Helper function to handle API responses
export const handleApiResponse = (response) => {
  return response.data;
};

// Helper function to handle API errors
export const handleApiError = (error) => {
  console.error('API Error details:', error);
  
  if (error.response) {
    // Server responded with error status
    const errorMessage = error.response.data?.error || error.response.data?.message || 'Authentication failed';
    const errorDetails = error.response.data?.details || [];
    console.error('Server error response:', error.response.data);
    return {
      message: errorMessage,
      details: errorDetails,
      status: error.response.status
    };
  } else if (error.request) {
    // Request made but no response received (network error or server down)
    console.error('Network error - no response received:', error.request);
    return {
      message: 'Unable to connect to server. Please check your internet connection.',
      details: ['Network error', 'Server may be unavailable'],
      status: null,
      isNetworkError: true
    };
  } else {
    // Something else happened
    console.error('Unexpected error:', error.message);
    return {
      message: error.message || 'An unexpected error occurred',
      details: [],
      status: null
    };
  }
};
