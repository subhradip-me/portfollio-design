import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle body overflow when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate header on mount
    gsap.fromTo('.header-container', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    // Check if we're on the AllWork page or any other page
    const currentPath = location.pathname;
    
    if (currentPath !== '/') {
      // Navigate to home first with hash, then scroll to section
      navigate(`/#${sectionId}`);
      // Small delay to ensure page loads before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We're on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (item) => {
    // Close menu first
    setIsMenuOpen(false);
    
    if (item === 'Home') {
      // Navigate to home page
      navigate('/');
    } else if (item === 'All Projects') {
      // Navigate to all work page
      navigate('/all-projects');
    } else {
      // Scroll to section
      scrollToSection(item.toLowerCase());
    }
  };

  return (
    <>
      <header 
        className={`header-container w-[70vw] max-sm:w-[90vw] h-16 max-sm:h-14 px-6 top-4 fixed z-50 transition-all duration-500 rounded-full flex items-center justify-between
          ${
            isScrolled 
              ? 'bg-zinc-50/80 backdrop-blur-md border border-zinc-300/50 shadow-sm' 
              : isMenuOpen
              ? 'bg-zinc-50/95 backdrop-blur-md border border-zinc-200/60'
              : 'bg-zinc-50/20 backdrop-blur-sm border border-zinc-100/30'
          }`}
        style={{ 
          left: '50%', 
          transform: 'translateX(-50%)' 
        }}
      >
        {/* Logo */}
        <div className="font-light text-lg md:text-xl lg:text-xl transition-colors duration-300">
          <Link to="/">
          <span className="text-zinc-900 tracking-tight">
            subhradip<span className="text-zinc-300">.me</span>
          </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="items-center hidden md:flex md:space-x-6 lg:space-x-8">
          {['Home', 'About', 'Projects', 'Contact'].map((item, index) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="relative font-light text-sm lg:text-base text-zinc-600 hover:text-zinc-900 transition-colors duration-300 group"
            >
              {item}
              <div className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-400 transition-all duration-300 group-hover:w-full"></div>
              <span className="absolute -top-1 -right-1 text-xs font-mono text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
            </button>
          ))}
        </nav>

        {/* Minimalistic CTA - Desktop */}
        <button 
          onClick={() => scrollToSection('contact')}
          className="hidden md:flex items-center space-x-1 text-sm lg:text-base text-zinc-700 hover:text-zinc-900 transition-colors duration-300 group"
        >
          <span className="font-light">Contact</span>
          <div className="w-0 group-hover:w-3 h-px bg-zinc-400 transition-all duration-300"></div>
        </button>

        {/* Menu Toggle Button */}
        <button 
          onClick={toggleMenu}
          className="flex items-center justify-center w-8 h-8 md:hidden transition-all duration-300 group relative z-50"
          aria-label="Toggle menu"
        >
          <div className="relative">
            {!isMenuOpen ? (
              // Hamburger state
              <div className="space-y-1.5">
                <div className="w-4 h-px bg-zinc-700 transition-all duration-300"></div>
                <div className="w-3 h-px bg-zinc-500 transition-all duration-300"></div>
              </div>
            ) : (
              // Close state
              <div className="relative">
                <div className="w-4 h-px bg-zinc-700 transform rotate-45 absolute"></div>
                <div className="w-4 h-px bg-zinc-700 transform -rotate-45"></div>
              </div>
            )}
          </div>
        </button>
      </header>

      {/* Seamless Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu fixed inset-0 z-40 md:hidden">
          {/* Blended Background with click to close */}
          <div 
            className="absolute inset-0 bg-zinc-50 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            {/* Subtle texture */}
            <div 
              className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }}
            ></div>
          </div>

          {/* Menu Content - Positioned to align with header */}
          <div className="relative h-full" onClick={(e) => e.stopPropagation()}>
            {/* Navigation Links - Centered */}
            <nav className="flex flex-col items-center justify-center h-full space-y-1">
              {['Home', 'About', 'Projects', 'All Projects', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="group py-6 transition-all duration-500"
                  style={{
                    animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl font-light text-zinc-800 group-hover:text-zinc-900 transition-colors duration-300 tracking-tight block">
                      {item}
                    </span>
                    <div className="flex items-center justify-center mt-2 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-6 h-px bg-zinc-300"></div>
                      <span className="text-xs font-mono text-zinc-400">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </span>
                      <div className="w-6 h-px bg-zinc-300"></div>
                    </div>
                  </div>
                </button>
              ))}
            </nav>

            {/* Footer - Contact CTA */}
            <div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
              style={{
                animation: `slideUp 0.6s ease-out 0.5s both`
              }}
            >
              <button 
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center space-x-2 text-zinc-600 hover:text-zinc-900 transition-colors duration-300 group"
              >
                <div className="w-0 group-hover:w-4 h-px bg-zinc-400 transition-all duration-300"></div>
                <span className="text-sm font-light">Get in touch</span>
                <div className="w-0 group-hover:w-4 h-px bg-zinc-400 transition-all duration-300"></div>
              </button>
              <div className="text-zinc-400 text-xs font-mono mt-2 tracking-wider">EST. 2025</div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for seamless animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .mobile-menu {
          animation: fadeInSmooth 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes fadeInSmooth {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
