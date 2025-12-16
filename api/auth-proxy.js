/**
 * Vercel Serverless Function - Auth Proxy
 * Proxies authentication requests to bypass CORS
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Make request to backend API
    const response = await fetch('https://portfollio-backend-2-85n5.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    // Return the exact response from backend
    if (response.ok) {
      return res.status(200).json(data);
    } else {
      return res.status(response.status).json(data);
    }

  } catch (error) {
    console.error('Auth proxy error:', error);
    return res.status(500).json({ 
      error: 'Authentication proxy failed',
      details: error.message 
    });
  }
}
