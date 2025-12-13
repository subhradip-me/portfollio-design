import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

// Page components
import AllWork from "./pages/AllWork";

// Main portfolio components
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SEOMetaTags from "./components/SEOMetaTags";
import ErrorBoundary from "./components/ErrorBoundary";

// Authentication and Admin components
import Admin from "./components/Admin";
import LoginForm from "./components/LoginForm";

/**
 * Main App Component
 * Handles routing and layout for the portfolio application
 */
export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
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
                <Projects />
                <Contact />
                <Footer />
              </main>
            } 
          />
          
          {/* Portfolio pages */}
          <Route path="/all-projects" element={
            <>
              <SEOMetaTags />
              <AllWork />
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
        </Routes>
      </Router>
    </HelmetProvider>
    </ErrorBoundary>
  );
}
