import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Meta Tags Component - Production Optimized for subhradip.me
 * Dynamically sets page metadata based on current route using native DOM API
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Override page title
 * @param {string} props.description - Override page description
 * @param {string} props.image - Override OG image
 * @param {Array} props.keywords - Override keywords
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
    // Enhanced meta for subhradip.me
    const defaultMeta = {
      '/': {
        title: 'Subhradip Hansda - Full Stack Developer & UI/UX Designer',
        description: 'Professional portfolio of Subhradip Hansda. Full Stack Developer specializing in React, Node.js, and modern web technologies. Creating innovative digital solutions.',
        keywords: ['Subhradip Hansda', 'Full Stack Developer', 'React Developer', 'Node.js', 'UI/UX Designer', 'Web Developer', 'JavaScript', 'TypeScript', 'Portfolio'],
        ogType: 'website'
      },
      '/all-projects': {
        title: 'Projects - Subhradip Hansda',
        description: 'Explore my latest web development projects including React applications, full-stack solutions, and innovative UI/UX designs.',
        keywords: ['Web Projects', 'React Projects', 'Full Stack Projects', 'Subhradip Portfolio'],
        ogType: 'website'
      },
      '/admin': {
        title: 'Admin Dashboard - Subhradip.me',
        description: 'Admin panel for portfolio management',
        keywords: ['Admin', 'Dashboard'],
        ogType: 'website'
      },
      '/login': {
        title: 'Login - Subhradip.me',
        description: 'Secure login portal',
        keywords: ['Login', 'Authentication'],
        ogType: 'website'
      }
    };

    // Get page-specific meta
    const pageMeta = defaultMeta[currentPath] || defaultMeta['/'];
    
    // Use props or fall back to page meta
    const pageTitle = title || pageMeta.title;
    const pageDescription = description || pageMeta.description;
    const pageImage = image || '/og-image.jpg';
    const pageKeywords = keywords.length > 0 ? keywords : pageMeta.keywords;
    
    // Construct full URL for canonical and OG tags
    const canonicalUrl = `https://subhradip.me${currentPath}`;
    const imageUrl = `https://subhradip.me${pageImage}`;

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

    // Set basic meta tags with enhanced SEO
    setMetaTag('description', pageDescription);
    setMetaTag('keywords', pageKeywords.join(', '));
    setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMetaTag('author', 'Subhradip Chakraborty');
    setMetaTag('language', 'en');
    setMetaTag('theme-color', '#000000');
    
    // Enhanced Open Graph tags
    setMetaTag('og:title', pageTitle, 'property');
    setMetaTag('og:description', pageDescription, 'property');
    setMetaTag('og:type', 'website', 'property');
    setMetaTag('og:url', canonicalUrl, 'property');
    setMetaTag('og:site_name', 'Subhradip Chakraborty Portfolio', 'property');
    setMetaTag('og:locale', 'en_US', 'property');
    setMetaTag('og:image', imageUrl, 'property');
    setMetaTag('og:image:width', '1200', 'property');
    setMetaTag('og:image:height', '630', 'property');
    setMetaTag('og:image:alt', pageTitle, 'property');
    
    // Enhanced Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:site', '@subhradip_me');
    setMetaTag('twitter:creator', '@subhradip_me');
    setMetaTag('twitter:title', pageTitle);
    setMetaTag('twitter:description', pageDescription);
    setMetaTag('twitter:image', imageUrl);
    setMetaTag('twitter:image:alt', pageTitle);
    
    // Set canonical URL and preconnect for performance
    setLinkTag('canonical', canonicalUrl);
    setLinkTag('preconnect', 'https://fonts.googleapis.com');
    setLinkTag('dns-prefetch', 'https://www.google-analytics.com');

    // Enhanced structured data for better search results
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    
    // Comprehensive structured data for Subhradip Chakraborty
    const enhancedStructuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://subhradip.me/#person",
          name: "Subhradip Chakraborty",
          url: "https://subhradip.me",
          image: "https://subhradip.me/og-image.jpg",
          description: "Full Stack Developer specializing in React, Node.js, and modern web technologies",
          jobTitle: "Full Stack Developer & UI/UX Designer",
          worksFor: {
            "@type": "Organization",
            name: "Freelance"
          },
          knowsAbout: ["React", "Node.js", "JavaScript", "TypeScript", "UI/UX Design", "Web Development"],
          sameAs: [
            "https://github.com/subhradip-me",
            "https://linkedin.com/in/subhradip-chakraborty"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://subhradip.me/#website",
          url: "https://subhradip.me",
          name: "Subhradip Chakraborty Portfolio",
          description: "Professional portfolio showcasing full stack development projects and UI/UX designs",
          publisher: {
            "@id": "https://subhradip.me/#person"
          },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://subhradip.me/all-projects?search={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "WebPage",
          "@id": canonicalUrl,
          url: canonicalUrl,
          name: pageTitle,
          description: pageDescription,
          isPartOf: {
            "@id": "https://subhradip.me/#website"
          },
          about: {
            "@id": "https://subhradip.me/#person"
          },
          datePublished: "2024-01-01T00:00:00+00:00",
          dateModified: new Date().toISOString()
        }
      ]
    };
    
    structuredDataScript.textContent = JSON.stringify(enhancedStructuredData);

    // Cleanup function to remove meta tags when component unmounts
    return () => {
      // We don't remove meta tags on cleanup to avoid flickering
      // They will be updated by the next page's SEO component
    };
  }, [currentPath, title, description, image, keywords]);

  // This component doesn't render anything
  return null;
}
