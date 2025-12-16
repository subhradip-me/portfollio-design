/**
 * Authentication Debug Utilities for Production
 * Helps identify login issues in production environment
 */

export const debugAuth = {
  logAuthState(context, authState) {
    if (import.meta.env.PROD) {
      console.group(`🔐 Auth Debug - ${context}`);
      console.log('Auth State:', {
        isAuthenticated: authState?.isAuthenticated,
        user: authState?.user,
        loading: authState?.loading
      });
      console.log('Local Storage:', {
        token: localStorage.getItem('token') ? 'PRESENT' : 'MISSING',
        user: localStorage.getItem('user') ? 'PRESENT' : 'MISSING'
      });
      console.log('Current URL:', window.location.href);
      console.groupEnd();
    }
  },

  async testDirectLogin(credentials) {
    console.group('🧪 Direct Login Test');
    
    try {
      const response = await fetch('https://portfollio-backend-2-85n5.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify(credentials)
      });

      console.log('Response Status:', response.status);
      console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const data = await response.json();
        console.log('Login Success:', {
          hasToken: !!data.token,
          hasUser: !!data.user,
          tokenLength: data.token?.length || 0
        });
        return { success: true, data };
      } else {
        const error = await response.json();
        console.error('Login Failed:', error);
        return { success: false, error };
      }
    } catch (error) {
      console.error('Network Error:', error);
      return { success: false, error: { message: error.message } };
    } finally {
      console.groupEnd();
    }
  },

  logEnvironment() {
    console.group('🌍 Environment Debug');
    console.log('Domain:', window.location.origin);
    console.log('Production Mode:', import.meta.env.PROD);
    console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
    console.log('User Agent:', navigator.userAgent);
    console.groupEnd();
  }
};
