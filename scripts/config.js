/**
 * Node.js specific configuration for build scripts
 */

// Route constants for sitemap generation
export const ROUTES = {
  HOME: '/',
  ALL_PROJECTS: '/all-projects',
  ADMIN: '/admin',
  LOGIN: '/login',
};

// Site configuration for Node.js environment
export const SITE_CONFIG = {
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://your-portfolio-domain.com' // Replace with your actual domain
    : 'http://localhost:5174',
  lastModified: new Date().toISOString(),
};

// Main sitemap structure
export const sitemap = [
  {
    url: ROUTES.HOME,
    title: 'Home - Portfolio',
    description: 'Professional portfolio showcasing projects, skills, and experience',
    priority: 1.0,
    changeFreq: 'weekly',
    lastModified: new Date().toISOString(),
    sections: [
      'hero',
      'about', 
      'projects',
      'contact'
    ]
  },
  {
    url: ROUTES.ALL_PROJECTS,
    title: 'All Projects - Portfolio',
    description: 'Complete collection of projects and case studies',
    priority: 0.8,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString()
  },
  // Admin routes typically shouldn't be in public sitemap
  // but included here for completeness
  {
    url: ROUTES.ADMIN,
    title: 'Admin Dashboard',
    description: 'Administrative dashboard',
    priority: 0.1,
    changeFreq: 'yearly',
    lastModified: new Date().toISOString(),
    noindex: true // Prevent search engine indexing
  }
];
