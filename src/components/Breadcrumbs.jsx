import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getBreadcrumbs } from '../config/sitemap';

/**
 * Breadcrumb Navigation Component
 * Shows the current page location in the site hierarchy
 * 
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 */
export default function Breadcrumbs({ className = '' }) {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Get breadcrumb items from sitemap configuration
  const breadcrumbItems = getBreadcrumbs(currentPath);
  
  // Don't render breadcrumbs on home page or if only one item
  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb navigation"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          
          return (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 mx-2 text-zinc-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              
              {isLast ? (
                <span 
                  className="font-medium text-zinc-900 dark:text-zinc-100"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
