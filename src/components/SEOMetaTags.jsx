import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getPageMeta, structuredData, SITE_CONFIG } from '../config/sitemap';

/**
 * SEO Meta Tags Component
 * Dynamically sets page metadata based on current route
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Override page title
 * @param {string} props.description - Override page description
 * @param {string} props.image - Override OG image
 */
export default function SEOMetaTags({ 
  title, 
  description, 
  image,
  keywords = []
}) {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Get default meta from sitemap config with error handling
  let defaultMeta;
  try {
    defaultMeta = getPageMeta(currentPath);
  } catch (error) {
    console.warn('Error getting page meta:', error);
    // Fallback meta
    defaultMeta = {
      title: 'Portfolio',
      description: 'Professional portfolio website',
      keywords: ['portfolio', 'web developer'],
      ogType: 'website',
      ogImage: '/images/og-default.jpg'
    };
  }
  
  // Use props or fall back to config
  const pageTitle = title || defaultMeta?.title || 'Portfolio';
  const pageDescription = description || defaultMeta?.description || 'Professional portfolio website';
  const pageImage = image || defaultMeta?.ogImage || '/images/og-default.jpg';
  const pageKeywords = keywords.length > 0 ? keywords : (defaultMeta?.keywords || ['portfolio', 'web developer']);
  
  // Construct full URL for canonical and OG tags
  const canonicalUrl = `${SITE_CONFIG.baseUrl}${currentPath}`;
  // Only include image URL if image exists and doesn't end with .md
  const imageUrl = pageImage && !pageImage.endsWith('.md') 
    ? `${SITE_CONFIG.baseUrl}${pageImage}` 
    : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords?.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={defaultMeta.ogType || 'website'} />
      <meta property="og:site_name" content="Portfolio" />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl && <meta property="og:image:alt" content={pageTitle} />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="author" content="Your Name" />
      
      {/* Robots Meta */}
      {defaultMeta.robots && (
        <meta name="robots" content={defaultMeta.robots} />
      )}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Sitemap */}
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    </Helmet>
  );
}
