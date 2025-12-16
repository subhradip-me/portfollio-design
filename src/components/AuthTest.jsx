import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useApi';
import { debugAuth } from '../utils/debugAuth';

const AuthTest = () => {
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const authState = useAuth();

  useEffect(() => {
    debugAuth.logEnvironment();
    debugAuth.logAuthState('AuthTest Page', authState);
  }, [authState]);

  const runTests = async () => {
    setIsLoading(true);
    const results = {};

    try {
      // Test 1: Direct API connectivity
      console.log('🧪 Test 1: API Connectivity');
      try {
        const response = await fetch('https://portfollio-backend-2-85n5.onrender.com/api/health');
        results.apiConnectivity = {
          success: response.ok,
          status: response.status,
          data: await response.json()
        };
      } catch (error) {
        results.apiConnectivity = { success: false, error: error.message };
      }

      // Test 2: CORS preflight
      console.log('🧪 Test 2: CORS Preflight');
      try {
        const response = await fetch('https://portfollio-backend-2-85n5.onrender.com/api/auth/login', {
          method: 'OPTIONS',
          headers: {
            'Origin': window.location.origin,
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Content-Type,Authorization'
          }
        });
        results.corsTest = {
          success: response.ok,
          status: response.status,
          headers: Object.fromEntries(response.headers.entries())
        };
      } catch (error) {
        results.corsTest = { success: false, error: error.message };
      }

      // Test 3: Login with test credentials
      console.log('🧪 Test 3: Test Login');
      const testCredentials = { email: 'test@test.com', password: 'test123' };
      const loginResult = await debugAuth.testDirectLogin(testCredentials);
      results.testLogin = loginResult;

      setTestResults(results);
    } catch (error) {
      console.error('Test suite failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('✅ Local storage cleared');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-zinc-900">Authentication Debug Panel</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Auth State</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>Authenticated: {authState?.isAuthenticated ? '✅ Yes' : '❌ No'}</div>
            <div>Loading: {authState?.loading ? '⏳ Yes' : '✅ No'}</div>
            <div>User: {authState?.user ? '✅ Present' : '❌ Missing'}</div>
            <div>Token: {localStorage.getItem('token') ? '✅ Present' : '❌ Missing'}</div>
            <div>Domain: {window.location.origin}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="space-x-4">
            <button 
              onClick={runTests}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Running Tests...' : 'Run Diagnostic Tests'}
            </button>
            <button 
              onClick={clearStorage}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear Storage & Reload
            </button>
            <a 
              href="/admin" 
              className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Go to Admin Panel
            </a>
          </div>
        </div>

        {Object.keys(testResults).length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            <pre className="bg-zinc-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(testResults, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthTest;
