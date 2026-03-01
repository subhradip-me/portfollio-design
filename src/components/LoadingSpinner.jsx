import React from 'react';
import PropTypes from 'prop-types';

/**
 * LoadingSpinner Component
 * A lightweight loading indicator for Suspense fallback and async operations
 * Matches the portfolio's dark theme without changing the visual style
 */
export default function LoadingSpinner({ 
  size, 
  className,
  text
}) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
    xl: 'w-24 h-24 border-4'
  };

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  text: PropTypes.string
};

LoadingSpinner.defaultProps = {
  size: 'md',
  className: '',
  text: 'Loading...'
};

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`
          ${sizeClasses[size] || sizeClasses.md}
          border-zinc-600 
          border-t-zinc-300 
          rounded-full 
          animate-spin
        `}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <span className="mt-4 text-sm text-zinc-400 tracking-wider animate-pulse">
          {text}
        </span>
      )}
    </div>
  );
}

/**
 * PageLoader Component
 * Full-page loading state for route transitions
 */
export function PageLoader() {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <LoadingSpinner size="lg" text="Loading page..." />
    </div>
  );
}

/**
 * SectionLoader Component
 * Loading state for individual sections
 */
export function SectionLoader({ text }) {
  return (
    <div className="py-12 flex items-center justify-center">
      <LoadingSpinner size="md" text={text} />
    </div>
  );
}

SectionLoader.propTypes = {
  text: PropTypes.string
};

SectionLoader.defaultProps = {
  text: 'Loading...'
};

/**
 * InlineLoader Component
 * Small inline loading indicator for buttons/forms
 */
export function InlineLoader({ className }) {
  return (
    <span 
      className={`
        inline-block w-4 h-4 border-2 border-zinc-600 border-t-zinc-300 
        rounded-full animate-spin ${className}
      `}
      role="status"
      aria-label="Loading"
    />
  );
}

InlineLoader.propTypes = {
  className: PropTypes.string
};

InlineLoader.defaultProps = {
  className: ''
};
