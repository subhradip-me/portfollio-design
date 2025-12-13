import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef(null)
  const socialRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer entrance animation
      gsap.from(logoRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        }
      })

      gsap.from(linksRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        }
      })

      gsap.from(socialRef.current.children, {
        scale: 0,
        rotation: 180,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        }
      })

      gsap.from(bottomRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%",
        }
      })

    }, footerRef)

    return () => ctx.revert()
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer ref={footerRef} className="bg-white py-20 lg:py-28 relative overflow-hidden border-t border-zinc-100">
      {/* Minimal background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-24 w-px h-12 bg-zinc-200"></div>
        <div className="absolute bottom-20 left-20 w-8 h-px bg-zinc-200"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-zinc-300 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 lg:mb-24">
          
          {/* Logo & Description */}
          <div className="lg:col-span-6">
            <div ref={logoRef} className="space-y-8">
              <div>
                <h3 className="text-4xl lg:text-5xl font-light text-zinc-900 mb-4 tracking-tight">
                  Subhradip<span className='text-zinc-400'>.me</span>
                </h3>
                <p className="text-base lg:text-lg text-zinc-600 leading-relaxed font-light max-w-md">
                  Creative developer passionate about crafting beautiful digital experiences 
                  that blend functionality with exceptional design.
                </p>
              </div>

              {/* Quick Contact */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono text-zinc-400 tracking-widest">QUICK CONTACT</h4>
                <div className="space-y-2">
                  <a 
                    href="mailto:contact@subhradip.me"
                    className="block text-sm text-zinc-700 hover:text-zinc-900 transition-colors duration-300 font-mono"
                  >
                    contact@subhradip.me
                  </a>
                  <a 
                    href="tel:+1234567890"
                    className="block text-sm text-zinc-700 hover:text-zinc-900 transition-colors duration-300 font-mono"
                  >
                    
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <div ref={linksRef} className="space-y-6">
              <h4 className="text-xs font-mono text-zinc-400 tracking-widest">NAVIGATION</h4>
              <nav className="space-y-3">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'About', href: '#about' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Contact', href: '#contact' }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="block text-sm text-zinc-600 hover:text-zinc-900 transition-colors duration-300 group"
                  >
                    <span className="group-hover:tracking-wide transition-all duration-300">
                      {link.name}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <h4 className="text-xs font-mono text-zinc-400 tracking-widest">SERVICES</h4>
              <nav className="space-y-3">
                {[
                  'Web Development',
                  'UI/UX Design',
                  'Design Systems',
                  'Consulting'
                ].map((service, index) => (
                  <span
                    key={index}
                    className="block text-sm text-zinc-600 font-light"
                  >
                    {service}
                  </span>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-2">
          <div className="w-32 h-px bg-zinc-200"></div>
          <div className="w-2 h-2 bg-zinc-300 rounded-full mx-8"></div>
          <div className="w-32 h-px bg-zinc-200"></div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center mb-8">
          <div ref={socialRef} className="flex space-x-8">
            {[
              { name: 'LinkedIn', url: '#', icon: 'linkedin' },
              { name: 'GitHub', url: '#', icon: 'github' },
              { name: 'Twitter', url: '#', icon: 'twitter' },
              { name: 'Dribbble', url: '#', icon: 'dribbble' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="w-12 h-12 border border-zinc-300 flex items-center justify-center hover:bg-zinc-900 hover:border-zinc-900 transition-all duration-300 group"
                aria-label={social.name}
              >
                <div className="w-5 h-5 bg-zinc-600 group-hover:bg-zinc-50 transition-colors duration-300"></div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div ref={bottomRef} className="text-center space-y-6">
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-xs font-mono text-zinc-500">
            <span>© {currentYear} Subhradip. All rights reserved.</span>
            <div className="hidden sm:block w-1 h-1 bg-zinc-400 rounded-full"></div>
            <span>Designed & Developed with ❤️</span>
          </div>

          {/* Additional Links */}
          <div className="flex justify-center space-x-8 text-xs text-zinc-400">
            <a href="#" className="hover:text-zinc-600 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-600 transition-colors duration-300">
              Terms of Service
            </a>
          </div>

          {/* Scroll to Top */}
          <div className="pt-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center space-x-3 text-sm font-mono text-zinc-500 hover:text-zinc-700 transition-colors duration-300 group"
            >
              <span className="tracking-wide">BACK TO TOP</span>
              <div className="w-6 h-6 border border-zinc-300 rounded-full flex items-center justify-center group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-all duration-300">
                <svg
                  className="w-3 h-3 transform group-hover:text-zinc-50 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
