import React from 'react';

export default function AdminTest() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ color: 'green', fontSize: '2rem' }}>✅ Admin Route Works!</h1>
      <p>This is a test admin page to verify routing is working correctly.</p>
      <div style={{ margin: '20px 0' }}>
        <strong>Current URL:</strong> {window.location.href}
      </div>
      <div style={{ margin: '20px 0' }}>
        <strong>Path:</strong> {window.location.pathname}
      </div>
      <button 
        onClick={() => window.location.href = '/'}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Go to Home
      </button>
    </div>
  );
}
