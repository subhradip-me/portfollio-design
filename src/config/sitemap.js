/**
 * Sitemap Configuration
 * Defines the site structure for SEO and navigation purposes
 */

// Import route constants for consistency
import { ROUTES } from '../constants/index.js';

/**
 * Site configuration (browser-compatible)
 */
export const SITE_CONFIG = {
  baseUrl: typeof window !== 'undefined' 
    ? (import.meta?.env?.MODE === 'production' 
        ? 'https://subhradip.me/' 
        : 'http://localhost:5173')
    : 'https://subhradip.me/', // Fallback for non-browser environments
  lastModified: new Date().toISOString(),
};

/**
 * Main sitemap structure
 * Defines all public pages available on the website
 */
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
    title: 'All Projects - Portfolio Gallery',
    description: 'Complete collection of development projects and case studies',
    priority: 0.8,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString(),
  },
  // Admin routes are excluded from public sitemap for security
];

/**
 * Generate XML sitemap content
 * @returns {string} XML sitemap string
 */
export const generateXMLSitemap = () => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';
  
  const urls = sitemap.map(page => {
    return `
    <url>
      <loc>${SITE_CONFIG.baseUrl}${page.url}</loc>
      <lastmod>${page.lastModified}</lastmod>
      <changefreq>${page.changeFreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`;
  }).join('');
  
  return `${xmlHeader}\n${urlsetOpen}${urls}\n${urlsetClose}`;
};

/**
 * Navigation structure for menus and breadcrumbs
 */
export const navigationStructure = [
  {
    label: 'Home',
    path: ROUTES.HOME,
    icon: 'home',
    description: 'Return to homepage'
  },
  {
    label: 'Projects',
    path: ROUTES.ALL_PROJECTS,
    icon: 'folder',
    description: 'View all projects'
  },
  {
    label: 'About',
    path: `${ROUTES.HOME}#about`,
    icon: 'user',
    description: 'Learn more about me'
  },
  {
    label: 'Contact',
    path: `${ROUTES.HOME}#contact`,
    icon: 'mail',
    description: 'Get in touch'
  }
];

/**
 * Breadcrumb configuration for different pages
 */
export const breadcrumbConfig = {
  [ROUTES.HOME]: [
    { label: 'Home', path: ROUTES.HOME }
  ],
  [ROUTES.ALL_PROJECTS]: [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Projects', path: ROUTES.ALL_PROJECTS }
  ],
  [ROUTES.ADMIN]: [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Admin', path: ROUTES.ADMIN }
  ],
  [ROUTES.LOGIN]: [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Login', path: ROUTES.LOGIN }
  ]
};

/**
 * Meta tags configuration for each page
 */
export const metaConfig = {
  [ROUTES.HOME]: {
    title: 'Portfolio - Full Stack Developer',
    description: 'Professional portfolio showcasing modern web development projects, skills in React, Node.js, and full-stack technologies.',
    keywords: ['portfolio', 'web developer', 'react', 'nodejs', 'full stack', 'javascript'],
    ogType: 'website',
    ogImage: '/images/og-home.jpg'
  },
  [ROUTES.ALL_PROJECTS]: {
    title: 'All Projects - Portfolio Gallery',
    description: 'Explore a comprehensive collection of web development projects, featuring React applications, API integrations, and modern web technologies.',
    keywords: ['projects', 'web development', 'portfolio', 'react projects', 'javascript'],
    ogType: 'website',
    ogImage: '/images/og-projects.jpg'
  },
  [ROUTES.ADMIN]: {
    title: 'Admin Dashboard',
    description: 'Portfolio administration panel',
    keywords: ['admin', 'dashboard'],
    ogType: 'website',
    ogImage: '/images/og-default.jpg',
    robots: 'noindex, nofollow' // Don't index admin pages
  },
  [ROUTES.LOGIN]: {
    title: 'Login - Portfolio Admin',
    description: 'Login to portfolio administration',
    keywords: ['login', 'admin'],
    ogType: 'website',
    ogImage: '/images/og-default.jpg',
    robots: 'noindex, nofollow' // Don't index login pages
  }
};

/**
 * Structured data for rich snippets
 */
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name", // Replace with your actual name
  "url": SITE_CONFIG.baseUrl,
  "jobTitle": "Full Stack Developer",
  "description": "Professional web developer specializing in React, Node.js, and modern web technologies",
  "knowsAbout": [
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "Express.js",
    "Full Stack Development",
    "Web Development",
    "API Development"
  ],
  "sameAs": [
    // Add your social media and professional profiles
    "https://github.com/yourusername",
    "https://linkedin.com/in/yourusername",
    "https://twitter.com/yourusername"
  ]
};

/**
 * Get page metadata by route
 * @param {string} route - Current route
 * @returns {Object} Page metadata
 */
export const getPageMeta = (route) => {
  return metaConfig[route] || metaConfig[ROUTES.HOME];
};

/**
 * Get breadcrumbs for current route
 * @param {string} route - Current route
 * @returns {Array} Breadcrumb items
 */
export const getBreadcrumbs = (route) => {
  return breadcrumbConfig[route] || breadcrumbConfig[ROUTES.HOME];
};

export default sitemap;
