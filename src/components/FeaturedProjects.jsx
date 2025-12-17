import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { projectsService } from '../services/projectsService'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedProjects() {
  const projectsRef = useRef(null)
  const titleRef = useRef(null)
  const numberRef = useRef(null)
  const projectRefs = useRef([])
  
  // State for projects from API
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch featured projects from API
  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Try to fetch featured projects
        const response = await projectsService.getProjects({ featured: true, limit: 3 })
        
        if (response.success && response.data?.projects) {
          setProjects(response.data.projects)
        } else {
          // Fallback to regular projects if no featured projects
          const fallbackResponse = await projectsService.getProjects({ limit: 3 })
          if (fallbackResponse.success && fallbackResponse.data?.projects) {
            setProjects(fallbackResponse.data.projects)
          } else {
            throw new Error('No projects found')
          }
        }
      } catch (err) {
        console.error('Error fetching featured projects:', err)
        setError(err.message)
        // Use fallback static data if API fails
        setProjects([
          {
            id: '01',
            title: 'E-Commerce Platform',
            subtitle: 'Full Stack Development',
            description: 'Modern e-commerce solution with React, Node.js, and AI-powered recommendations.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            thumbnailUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
            liveUrl: '#',
            year: 2024
          },
          {
            id: '02',
            title: 'Design System',
            subtitle: 'UI/UX Design & Development',
            description: 'Comprehensive design system with 200+ components and dark/light theme support.',
            technologies: ['Figma', 'React', 'Storybook', 'TypeScript'],
            thumbnailUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
            liveUrl: '#',
            year: 2024
          },
          {
            id: '03',
            title: 'Analytics Dashboard',
            subtitle: 'Data Visualization',
            description: 'Real-time analytics dashboard with interactive charts and performance metrics.',
            technologies: ['Next.js', 'D3.js', 'PostgreSQL', 'Redis'],
            thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
            liveUrl: '#',
            year: 2023
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProjects()
  }, [])

  useEffect(() => {
    // Only run animations if projects are loaded
    if (!projects.length || loading) return

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 100 })
      gsap.set(numberRef.current, { scale: 0, rotation: 180 })
      gsap.set(projectRefs.current, { opacity: 0 })

      // Header animations (not pinned)
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
        }
      })

      gsap.to(numberRef.current, {
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 70%",
        }
      })

      // Create individual project animations with pinning
      projectRefs.current.forEach((project, index) => {
        if (project) {
          // Set initial state for each project
          gsap.set(project, { opacity: 0 })
          gsap.set(project.querySelector('.project-image'), { x: index % 2 === 0 ? 100 : -100, opacity: 0 })
          gsap.set(project.querySelector('.project-content'), { x: index % 2 === 0 ? -50 : 50, opacity: 0 })
          gsap.set(project.querySelectorAll('.tech-tag'), { opacity: 0, y: 20, scale: 0.9 })

          // Pin each project individually
          ScrollTrigger.create({
            trigger: project,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            onEnter: () => {
              // Main timeline for entrance
              const tl = gsap.timeline()
              
              // Project container
              tl.to(project, {
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
              })

              // Image entrance
              .to(project.querySelector('.project-image'), {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out"
              }, "-=0.6")

              // Content entrance  
              .to(project.querySelector('.project-content'), {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
              }, "-=0.8")

              // Tech tags
              .to(project.querySelectorAll('.tech-tag'), {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: "back.out(1.7)"
              }, "-=0.4")
            },
            onLeave: () => {
              gsap.to(project, {
                opacity: 0.3,
                duration: 0.3,
                ease: "power2.out"
              })
            },
            onEnterBack: () => {
              gsap.to(project, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
              })
            }
          })

          // Subtle parallax effect within pinned area
          ScrollTrigger.create({
            trigger: project,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress
              const image = project.querySelector('.project-image img')

              // Very subtle parallax on image only
              if (image) {
                gsap.set(image, { y: progress * 15 })
              }
            }
          })
        }
      })

      // Background elements animation (simplified)
      gsap.to('.bg-element', {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none"
      })

      // Floating animation for decorative elements (reduced intensity)
      gsap.to('.floating-element', {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

    }, projectsRef)

    return () => ctx.revert()
  }, [projects, loading]) // Re-run when projects are loaded

  const handleProjectHover = () => {
    // Future: Could add hover effects here
  }

  const handleProjectLeave = () => {
    // Future: Could add hover effects here
  }

  return (
    <section ref={projectsRef} id="projects" className="min-h-screen bg-zinc-50 py-16 lg:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="bg-element absolute top-1/4 left-4 sm:left-10 w-px h-20 sm:h-40 bg-linear-to-b from-transparent via-zinc-300 to-transparent opacity-50"></div>
        <div className="bg-element absolute bottom-1/3 right-8 sm:right-20 w-16 sm:w-32 h-px bg-linear-to-r from-transparent via-zinc-300 to-transparent opacity-50"></div>
        <div className="floating-element absolute top-1/2 right-1/4 w-2 h-2 bg-zinc-400 rounded-full opacity-30"></div>
        <div className="floating-element absolute bottom-1/4 left-1/3 w-1 h-1 bg-zinc-300 rounded-full opacity-50"></div>
        
        {/* Creative floating elements */}
        <div className="bg-element floating-element absolute top-1/3 left-1/2 w-32 h-32 border border-zinc-200 rounded-full opacity-20"></div>
        <div className="bg-element floating-element absolute bottom-1/5 right-1/3 w-20 h-20 border border-zinc-300 rotate-45 opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section number */}
        <div ref={numberRef} className="absolute top-36 lg:top-8 right-4 sm:right-6 lg:right-12 w-10 h-10 lg:w-12 lg:h-12 bg-zinc-900 text-zinc-50 rounded-full flex items-center justify-center text-sm font-mono shadow-lg">
          03
        </div>

        {/* Header */}
        <div className="mb-12 mt-6 lg:mb-32">
          <div className="flex items-center space-x-6 mb-12">
            <div className="w-20 h-px bg-zinc-300"></div>
            <span className="text-xs font-mono text-zinc-500 tracking-[0.2em]">FEATURED WORK</span>
            <div className="w-8 h-8 border-2 border-zinc-200 rotate-45"></div>
          </div>
          
          <h2 ref={titleRef} className="text-5xl sm:text-6xl lg:text-8xl font-extralight text-zinc-900 leading-none tracking-tight">
            Selected
            <span className="block text-zinc-400 italic font-light" style={{ fontFamily: 'Georgia, serif' }}>
              Projects
            </span>
          </h2>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-8">
              <div className="w-12 h-12 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin mx-auto"></div>
              <div className="space-y-2">
                <p className="text-zinc-600 font-medium">Loading featured projects...</p>
                <p className="text-xs text-zinc-400 font-mono">Fetching from API</p>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-8 max-w-md">
              <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-2">
                <p className="text-zinc-700 font-medium">Unable to load projects</p>
                <p className="text-xs text-zinc-500">Using fallback data instead</p>
              </div>
            </div>
          </div>
        )}

        {/* Projects - Individual Wrappers */}
        {!loading && projects.map((project, index) => (
          <div
            key={project._id || project.id || index}
            ref={el => projectRefs.current[index] = el}
            className="min-h-screen flex items-center justify-center relative"
          >
            {/* Project background elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="project-bg absolute top-1/4 left-8 w-2 h-2 bg-zinc-400 rounded-full opacity-20"></div>
              <div className="project-bg absolute bottom-1/3 right-8 w-1 h-1 bg-zinc-300 rounded-full opacity-30"></div>
              <div className="project-bg absolute top-1/2 right-1/4 w-16 h-16 border border-zinc-200 rounded-full opacity-10"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
              <div
                className="group cursor-pointer"
                onMouseEnter={handleProjectHover}
                onMouseLeave={handleProjectLeave}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  {/* Project Info */}
                  <div className={`project-content lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2' : ''} space-y-8`}>
                    {/* Project Number */}
                    <div className="flex items-start justify-between">
                      <div className="text-6xl lg:text-8xl font-mono text-zinc-200 group-hover:text-zinc-300 transition-colors duration-700 leading-none">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="text-xs font-mono text-zinc-400 tracking-wider bg-zinc-100 px-3 py-1 rounded-full">
                        {project.year || new Date().getFullYear()}
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="space-y-3">
                      <h3 className="text-3xl lg:text-4xl xl:text-5xl font-light text-zinc-800 group-hover:text-zinc-600 transition-colors duration-500 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-base lg:text-lg text-zinc-500 font-light tracking-wide">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm lg:text-base text-zinc-600 leading-relaxed max-w-lg font-light">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono text-zinc-400 tracking-[0.15em]">TECHNOLOGIES</h4>
                      <div className="flex flex-wrap gap-3">
                        {(project.technologies || project.tech || []).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="tech-tag px-4 py-2 text-xs font-mono bg-zinc-100 text-zinc-700 border border-zinc-200 group-hover:bg-zinc-200 group-hover:border-zinc-300 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Link */}
                    <div className="pt-6">
                      <a
                        href={project.liveUrl || project.link || '#'}
                        className="inline-flex items-center space-x-3 text-sm font-mono text-zinc-600 group-hover:text-zinc-800 transition-colors duration-300 group/link"
                        target={project.liveUrl ? "_blank" : "_self"}
                        rel={project.liveUrl ? "noopener noreferrer" : undefined}
                      >
                        <span className="tracking-wide">EXPLORE PROJECT</span>
                        <div className="w-8 h-8 border border-zinc-300 rounded-full flex items-center justify-center group-hover/link:bg-zinc-900 group-hover/link:border-zinc-900 transition-all duration-300">
                          <svg
                            className="w-4 h-4 transform group-hover/link:translate-x-0.5 group-hover/link:text-zinc-50 transition-all duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className={`project-image lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="relative group/image">
                      <div className="aspect-4/3 relative overflow-hidden bg-zinc-100 border border-zinc-200 group-hover:border-zinc-300 transition-all duration-700">
                        <img
                          src={project.thumbnailUrl || project.image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop'}
                          alt={project.title}
                          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop'
                          }}
                        />
                        
                        {/* Minimalist overlay */}
                        <div className="absolute inset-0 bg-zinc-50/0 group-hover:bg-zinc-50/10 transition-all duration-500"></div>
                        
                        {/* Corner accent */}
                        <div className="absolute top-6 right-6 w-3 h-3 bg-zinc-900 opacity-0 group-hover:opacity-100 transition-all duration-300 transform rotate-45"></div>
                      </div>

                      {/* Floating project number */}
                      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-zinc-900 text-zinc-50 flex items-center justify-center font-mono text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Minimal bottom section */}
        <div className="mt-32 lg:mt-40 text-center space-y-12">
          <Link to="/all-projects">
            <div className="inline-flex items-center space-x-6 px-8 py-4 border border-zinc-200 hover:border-zinc-400 transition-colors cursor-pointer group bg-zinc-50/50 backdrop-blur-sm">
              <span className="text-sm font-mono text-zinc-600 group-hover:text-zinc-800 tracking-wide">VIEW ALL PROJECTS</span>
              <div className="w-6 h-6 border border-zinc-300 rounded-full flex items-center justify-center group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-all duration-300">
                <div className="w-2 h-2 bg-zinc-400 rounded-full group-hover:bg-zinc-50 transition-colors duration-300"></div>
              </div>
            </div>
          </Link>

          {/* Clean scroll indicator */}
          <div className="flex items-center justify-center space-x-8 opacity-30">
            <div className="w-24 h-px bg-zinc-300"></div>
            <div className="w-1 h-8 bg-zinc-200"></div>
            <div className="w-24 h-px bg-zinc-300"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
