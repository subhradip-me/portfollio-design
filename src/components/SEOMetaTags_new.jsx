import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMeta, structuredData, SITE_CONFIG } from '../config/sitemap';

/**
 * SEO Meta Tags Component (React 19 Compatible)
 * Dynamically sets page metadata based on current route using native DOM API
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
  
  useEffect(() => {
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

    // Update document title
    document.title = pageTitle;

    // Function to set or update meta tag
    const setMetaTag = (name, content, attribute = 'name') => {
      if (!content) return;
      
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Function to set or update link tag
    const setLinkTag = (rel, href) => {
      if (!href) return;
      
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Set basic meta tags
    setMetaTag('description', pageDescription);
    setMetaTag('keywords', pageKeywords.join(', '));
    setMetaTag('robots', defaultMeta?.robots || 'index, follow');
    
    // Set Open Graph tags
    setMetaTag('og:title', pageTitle, 'property');
    setMetaTag('og:description', pageDescription, 'property');
    setMetaTag('og:type', defaultMeta?.ogType || 'website', 'property');
    setMetaTag('og:url', canonicalUrl, 'property');
    if (imageUrl) {
      setMetaTag('og:image', imageUrl, 'property');
    }
    
    // Set Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', pageTitle);
    setMetaTag('twitter:description', pageDescription);
    if (imageUrl) {
      setMetaTag('twitter:image', imageUrl);
    }
    
    // Set canonical URL
    setLinkTag('canonical', canonicalUrl);

    // Set structured data
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    
    // Update structured data with current page info
    const pageStructuredData = {
      ...structuredData,
      url: canonicalUrl,
      mainEntity: {
        "@type": "WebPage",
        "@id": canonicalUrl,
        name: pageTitle,
        description: pageDescription
      }
    };
    
    structuredDataScript.textContent = JSON.stringify(pageStructuredData);

    // Cleanup function to remove meta tags when component unmounts
    return () => {
      // We don't remove meta tags on cleanup to avoid flickering
      // They will be updated by the next page's SEO component
    };
  }, [currentPath, title, description, image, keywords]);

  // This component doesn't render anything
  return null;
}
