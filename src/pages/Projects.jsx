import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { projectsService } from '../services/projectsService'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const projectsRef = useRef([])
  const cursorRef = useRef(null)
  
  // State management
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [categories, setCategories] = useState(['All'])

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await projectsService.getProjects({ 
          status: 'published',
          sortBy: 'year',
          sortOrder: 'desc'
        })
        
        if (response.success && response.data?.projects) {
          const projectsData = response.data.projects
          setProjects(projectsData)
          
          // Extract unique categories
          const uniqueCategories = [...new Set(projectsData.map(p => p.category).filter(Boolean))]
          setCategories(['All', ...uniqueCategories])
        } else {
          throw new Error(response.error?.message || 'Failed to fetch projects')
        }
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError(err.message)
        
        // Fallback to static data
        const fallbackProjects = [
          {
            _id: '001',
            title: 'E-Commerce Platform',
            category: 'Development',
            year: 2024,
            technologies: ['React', 'Node.js', 'AWS'],
            description: 'AI-powered e-commerce solution with real-time analytics',
            thumbnailUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
            liveUrl: '#',
            featured: true
          },
          {
            _id: '002',
            title: 'Design System',
            category: 'Design',
            year: 2024,
            technologies: ['Figma', 'Tokens', 'React'],
            description: 'Comprehensive design system with 200+ components',
            thumbnailUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop',
            liveUrl: '#',
            featured: true
          },
          {
            _id: '003',
            title: 'Analytics Dashboard',
            category: 'Development',
            year: 2023,
            technologies: ['Next.js', 'D3.js', 'Python'],
            description: 'Real-time data visualization with ML insights',
            thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
            liveUrl: '#',
            featured: true
          }
        ]
        setProjects(fallbackProjects)
        setCategories(['All', 'Development', 'Design', 'Branding', 'Mobile'])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  useEffect(() => {
    // Only run animations if projects are loaded
    if (loading || !projects.length) return

    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo('.hero-line', 
        { scaleX: 0, transformOrigin: 'left' },
        { 
          scaleX: 1, 
          duration: 1.5,
          ease: 'power3.inOut',
          stagger: 0.2
        }
      )

      gsap.fromTo('.hero-text',
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.5
        }
      )

      // Projects scroll-triggered animations with pinning
      projectsRef.current.forEach((project) => {
        if (project) {
          const image = project.querySelector('.project-image')
          const number = project.querySelector('.project-number')
          const content = project.querySelector('.project-content')

          // Set initial states
          gsap.set(image, { scale: 1.2, y: 50 })
          gsap.set(content, { opacity: 0, y: 100 })
          gsap.set(project, { opacity: 0.3, scale: 0.95 })

          // Create pinning animation timeline
          const pinTl = gsap.timeline({
            scrollTrigger: {
              trigger: project,
              start: "top top",
              end: "bottom top",
              pin: true,
              pinSpacing: false,
              scrub: 1,
              anticipatePin: 1,
              onEnter: () => {
                // Animate in current project
                gsap.to(project, {
                  opacity: 1,
                  scale: 1,
                  duration: 0.8,
                  ease: "power2.out"
                })
                gsap.to(content, {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out"
                })

                // Fade out other projects
                projectsRef.current.forEach(otherProject => {
                  if (otherProject !== project) {
                    gsap.to(otherProject, {
                      opacity: 0.1,
                      scale: 0.95,
                      duration: 0.6,
                      ease: "power2.out"
                    })
                  }
                })
              },
              onLeave: () => {
                // Fade out exiting project
                gsap.to(project, {
                  opacity: 0.1,
                  scale: 0.9,
                  duration: 0.5,
                  ease: "power2.in"
                })
                gsap.to(content, {
                  opacity: 0,
                  y: -50,
                  duration: 0.5,
                  ease: "power2.in"
                })
              },
              onEnterBack: () => {
                // Animate in when scrolling back
                gsap.to(project, {
                  opacity: 1,
                  scale: 1,
                  duration: 0.8,
                  ease: "power2.out"
                })
                gsap.to(content, {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out"
                })

                // Fade out other projects
                projectsRef.current.forEach(otherProject => {
                  if (otherProject !== project) {
                    gsap.to(otherProject, {
                      opacity: 0.1,
                      scale: 0.95,
                      duration: 0.6,
                      ease: "power2.out"
                    })
                  }
                })
              },
              onLeaveBack: () => {
                // Fade out when scrolling back past
                gsap.to(project, {
                  opacity: 0.1,
                  scale: 0.9,
                  duration: 0.5,
                  ease: "power2.in"
                })
              }
            }
          })

          // Parallax effects within the pinned timeline
          pinTl.to(image, {
            scale: 1.5,
            y: -100,
            ease: "none"
          }, 0)

          // Number animation
          if (number) {
            gsap.fromTo(number,
              { opacity: 0, x: -30 },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: project,
                  start: 'top 70%'
                }
              }
            )
          }

          // Enhanced hover interactions
          project.addEventListener('mouseenter', () => {
            gsap.to(image, {
              scale: "+=0.05",
              duration: 0.8,
              ease: "power2.out"
            })
          })

          project.addEventListener('mouseleave', () => {
            gsap.to(image, {
              scale: "-=0.05",
              duration: 0.8,
              ease: "power2.out"
            })
          })
        }
      })

      // Filter buttons animation
      gsap.fromTo('.filter-btn',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          delay: 1
        }
      )

    }, containerRef)

    return () => ctx.revert()
  }, [filteredProjects, loading, projects.length]) // Re-run when projects are loaded

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'none'
      })
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  const addToRefs = (el) => {
    if (el && !projectsRef.current.includes(el)) {
      projectsRef.current.push(el)
    }
  }

  const handleFilterChange = (category) => {
    setActiveFilter(category)
    
    // Animate out current projects
    gsap.to('.project-item', {
      
      y: 50,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.in',
      onComplete: () => {
        projectsRef.current = []
        // Small delay for React to update
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 100)
      }
    })
  }

  return (
    <>
      <Header />
      
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{ left: -12, top: -12 }}
      >
        <div className="w-full h-full bg-white rounded-full opacity-80"></div>
      </div>

      <main ref={containerRef} className="min-h-screen bg-zinc-50">
        
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
              }}
            />
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/5 w-1 h-32 bg-zinc-400/20 hero-line" />
            <div className="absolute bottom-1/3 right-1/4 w-24 h-1 bg-zinc-400/20 hero-line" />
            <div className="absolute top-1/2 right-1/5 w-3 h-3 bg-zinc-400/30 rounded-full hero-line" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <div className="hero-text mb-8">
              <span className="text-sm font-mono text-zinc-500 tracking-[0.3em] uppercase">
                Portfolio — 2025
              </span>
            </div>
            
            <h1 className="hero-text text-6xl md:text-8xl lg:text-9xl font-light text-zinc-900 leading-[0.8] tracking-tight mb-8">
              Selected
              <span className="block text-zinc-600/60 font-extralight">
                Works
              </span>
            </h1>
            
            <p className="hero-text text-lg md:text-xl text-zinc-600 font-light max-w-2xl mx-auto leading-relaxed">
              A collection of digital experiences crafted with precision, 
              innovation and an obsession for detail.
            </p>

            {/* Scroll Indicator */}
            <div className="hero-text absolute -bottom-32 left-1/2 transform -translate-x-1/2">
              <div className="flex flex-col items-center space-y-4">
                <span className="text-xs font-mono text-zinc-400 tracking-wider">SCROLL</span>
                <div className="w-px h-12 bg-zinc-300 animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="sticky top-0 z-30 bg-zinc-50/90 backdrop-blur-md border-b border-zinc-200/50">
          <div className="max-w-7xl h-48 lg:h-40  mx-auto px-6 py-8">
            <div className="mt-20 flex flex-wrap justify-center items-end gap-4">
              {!loading && categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`filter-btn relative font-mono text-sm tracking-wider transition-all duration-500 group ${
                    activeFilter === category 
                      ? 'text-zinc-900' 
                      : 'text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  {category}
                  <span className={`absolute -bottom-1 left-0 h-px bg-zinc-900 transition-all duration-500 ${
                    activeFilter === category ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                  <span className="ml-2 text-xs opacity-60">
                    {category === 'All' ? projects.length : projects.filter(p => p.category === category).length}
                  </span>
                </button>
              ))}
              
              {loading && (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border border-zinc-300 border-t-zinc-600 rounded-full animate-spin"></div>
                  <span className="text-sm text-zinc-500 font-mono">Loading filters...</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <section className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-8">
              <div className="w-16 h-16 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin mx-auto"></div>
              <div className="space-y-2">
                <p className="text-zinc-700 font-medium text-lg">Loading projects...</p>
                <p className="text-xs text-zinc-500 font-mono">Fetching from database</p>
              </div>
            </div>
          </section>
        )}

        {/* Error State */}
        {error && !loading && (
          <section className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-8 max-w-md">
              <div className="w-20 h-20 bg-zinc-100 rounded-3xl flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-3">
                <p className="text-zinc-700 font-medium text-lg">Unable to load projects</p>
                <p className="text-sm text-zinc-600">API Error: {error}</p>
                <p className="text-xs text-zinc-500">Showing fallback data instead</p>
              </div>
            </div>
          </section>
        )}

        {/* Projects Grid */}
        {!loading && (
          <section className="relative">
            <div className="w-full">
              <div className="space-y-0">
                {filteredProjects.map((project, index) => (
                  <article
                    key={project._id || project.id || index}
                    ref={addToRefs}
                    className="project-item group h-screen flex items-center"
                  >
                    <div className="max-w-7xl mx-auto px-6 pt-34 lg:pt-0 w-full">
                      <div className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-center bg-zinc-50/90 ${
                        index % 2 === 0 ? '' : 'lg:grid-flow-dense'
                      }`}>
                      
                      {/* Project Image */}
                      <div className={`lg:col-span-7 ${index % 2 === 0 ? '' : 'lg:col-start-6'} relative overflow-hidden bg-zinc-100 group-hover:bg-zinc-200 transition-colors duration-700`}>
                        <div className="aspect-5/3 lg:aspect-5/3 relative mt-4 lg:mt-8">
                          <img
                            src={project.thumbnailUrl || project.image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop'}
                            alt={project.title}
                            className="project-image w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop'
                            }}
                          />
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-transparent transition-all duration-700" />
                          
                          {/* Project Number */}
                          <div className="project-number absolute top-6 left-6 text-white/90 font-mono text-sm tracking-wide">
                            {String(index + 1).padStart(3, '0')}
                          </div>
                          
                          {/* Featured Badge */}
                          {project.featured && (
                            <div className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full opacity-80" />
                          )}
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className={`lg:col-span-5 ${index % 2 === 0 ? '' : 'lg:col-start-1 lg:row-start-1'} project-content space-y-8`}>
                        
                        {/* Meta */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono text-zinc-400 tracking-wider uppercase">
                              {project.category || 'Uncategorized'}
                            </span>
                            <span className="text-xs font-mono text-zinc-500">
                              {project.year || new Date().getFullYear()}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <div className="space-y-4">
                          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-zinc-900 leading-tight tracking-tight group-hover:text-zinc-700 transition-colors duration-500">
                            {project.title}
                          </h2>
                          <p className="text-lg text-zinc-600 font-light leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-3">
                          {(project.technologies || project.tags || []).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-4 py-2 text-xs font-mono bg-zinc-100 text-zinc-700 rounded-full hover:bg-zinc-200 transition-colors duration-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="pt-4">
                          <a
                            href={project.liveUrl || project.link || '#'}
                            className="inline-flex items-center space-x-3 text-sm font-mono text-zinc-600 hover:text-zinc-900 transition-colors duration-300 group/link"
                            target={project.liveUrl ? "_blank" : "_self"}
                            rel={project.liveUrl ? "noopener noreferrer" : undefined}
                          >
                            <span className="tracking-wide">VIEW PROJECT</span>
                            <div className="w-8 h-px bg-zinc-400 group-hover/link:bg-zinc-900 group-hover/link:w-12 transition-all duration-300" />
                          </a>
                        </div>
                      </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom Spacer */}
        <div className="h-32" />
      </main>
      
      <Footer />
    </>
  )
}
