import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useApi';
import { authService } from '../services';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();

  // Test CORS and log domain on component mount
  useEffect(() => {
    if (import.meta.env.PROD) {
      console.log('Current domain:', window.location.origin);
      console.log('Testing CORS connectivity...');
      authService.testCors().then(corsOk => {
        console.log('CORS test result:', corsOk ? 'SUCCESS' : 'FAILED');
        if (!corsOk) {
          console.warn('CORS might be blocked. Backend needs to whitelist:', window.location.origin);
        }
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (import.meta.env.DEV) {
      console.log('Login attempt with credentials:', { email: credentials.email, password: '[HIDDEN]' });
    }

    try {
      const result = await login(credentials);
      if (import.meta.env.DEV) {
        console.log('Login result:', result);
      }
      
      if (result.success) {
        if (import.meta.env.DEV) {
          console.log('Login successful, redirecting to admin panel');
        }
        // Redirect to admin panel
        window.location.href = '/admin';
      } else {
        console.error('Login failed:', result.error);
        setError(result.error?.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Background Elements - matching portfolio theme */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-24 w-px h-16 bg-zinc-200"></div>
        <div className="absolute bottom-32 left-20 w-12 h-px bg-zinc-200"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-zinc-300 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-zinc-100 rounded-full"></div>
      </div>

      <div className="max-w-md w-full mx-4 relative z-10">
        <div className="text-center mb-12">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-light text-zinc-900 mb-2 tracking-tight">
              Admin<span className='text-zinc-400'>.Panel</span>
            </h1>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="w-8 h-px bg-zinc-200"></div>
              <div className="w-1 h-1 bg-zinc-300 rounded-full"></div>
              <div className="w-8 h-px bg-zinc-200"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-light text-zinc-700">
              Portfolio Management
            </h2>
            <p className="text-sm text-zinc-500 font-mono tracking-wide">
              SECURE ACCESS REQUIRED
            </p>
          </div>
          
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 border border-red-200 bg-red-50 text-red-700 text-sm font-mono">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-1 bg-red-400 rounded-full"></div>
              <span>{error}</span>
            </div>
          </div>
        )}
        
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Email Field */}
          <div className="space-y-3">
            <label htmlFor="email" className="block text-xs font-mono text-zinc-400 tracking-widest">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-zinc-200 text-zinc-900 placeholder-zinc-400 font-light text-lg focus:outline-none focus:border-zinc-900 transition-colors duration-300 disabled:opacity-50"
              placeholder="admin@subhradip.me"
            />
          </div>
          
          {/* Password Field */}
          <div className="space-y-3">
            <label htmlFor="password" className="block text-xs font-mono text-zinc-400 tracking-widest">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-zinc-200 text-zinc-900 placeholder-zinc-400 font-light text-lg focus:outline-none focus:border-zinc-900 transition-colors duration-300 disabled:opacity-50"
              placeholder="Enter password"
            />
          </div>
          
          {/* Submit Button */}
          <div className="pt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-300 text-white font-mono text-sm tracking-wide transition-all duration-300 group disabled:cursor-not-allowed relative overflow-hidden"
            >
              <div className="flex items-center justify-center space-x-3">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border border-zinc-500 border-t-white rounded-full animate-spin"></div>
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <>
                    <span>ACCESS PANEL</span>
                    <div className="w-4 h-4 border border-zinc-500 group-hover:border-white transition-colors duration-300 flex items-center justify-center">
                      <div className="w-2 h-2 border-r border-t border-zinc-500 group-hover:border-white transform rotate-45 transition-colors duration-300"></div>
                    </div>
                  </>
                )}
              </div>
            </button>
          </div>
        </form>
        
        {/* Back to Portfolio Link */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-12 h-px bg-zinc-200"></div>
            <div className="w-1 h-1 bg-zinc-300 rounded-full"></div>
            <div className="w-12 h-px bg-zinc-200"></div>
          </div>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center space-x-3 text-sm font-mono text-zinc-500 hover:text-zinc-700 transition-colors duration-300 group"
          >
            <div className="w-6 h-6 border border-zinc-300 rounded-full flex items-center justify-center group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-all duration-300">
              <svg
                className="w-3 h-3 transform group-hover:text-zinc-50 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
            <span className="tracking-wide">BACK TO PORTFOLIO</span>
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-xs font-mono text-zinc-400 tracking-widest">
            PORTFOLIO.ADMIN.V2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
