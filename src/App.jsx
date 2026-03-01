import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useScrollToTop } from "./hooks/useScrollToTop";

// Eagerly loaded components (critical for initial render)
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import FeaturedProjects from "./components/FeaturedProjects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SEOMetaTags from "./components/SEOMetaTags";
import ErrorBoundary from "./components/ErrorBoundary";
import { PageLoader } from "./components/LoadingSpinner";

// Lazy loaded components (code split for better performance)
const Projects = lazy(() => import("./pages/Projects"));
const Admin = lazy(() => import("./components/Admin"));
const LoginForm = lazy(() => import("./components/LoginForm"));

/**
 * ScrollToTop Component
 * Handles scrolling to top on route changes
 */
const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

/**
 * Main App Component
 * Handles routing and layout for the portfolio application
 */
export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Main portfolio page - showcases all sections */}
          <Route 
            path="/" 
            element={
              <main className="overflow-hidden">
                <SEOMetaTags />
                <Cursor />
                <Header />
                <Hero />
                <About />
                <FeaturedProjects />
                <Contact />
                <Footer />
              </main>
            } 
          />
          
          {/* Portfolio pages */}
          <Route path="/projects" element={
            <>
              <SEOMetaTags />
              <Projects />
            </>
          } />
          
          {/* Admin and authentication pages */}
          <Route path="/admin" element={
            <>
              <SEOMetaTags />
              <Admin />
            </>
          } />
          <Route path="/login" element={
            <>
              <SEOMetaTags />
              <LoginForm />
            </>
          } />
          
          {/* Catch-all route for 404 pages */}
          <Route path="*" element={
            <>
              <SEOMetaTags />
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                  <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
                  <a 
                    href="/" 
                    className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            </>
          } />
        </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}
