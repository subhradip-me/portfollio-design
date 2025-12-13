import React from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteDebugger() {
  const location = useLocation();
  
  if (import.meta.env.PROD) {
    return null; // Don't show in production
  }
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <strong>Route Debug:</strong><br />
      Pathname: {location.pathname}<br />
      Search: {location.search}<br />
      Hash: {location.hash}<br />
      Environment: {import.meta.env.MODE}<br />
      Base URL: {window.location.origin}
    </div>
  );
}
