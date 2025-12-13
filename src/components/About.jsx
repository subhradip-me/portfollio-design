import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const aboutRef = useRef(null)
  const titleRef = useRef(null)
  const numberRef = useRef(null)
  const contentRef = useRef(null)
  const skillsRef = useRef(null)
  const codeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
        }
      })

      // Number animation
      gsap.from(numberRef.current, {
        scale: 0,
        rotation: 180,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 70%",
        }
      })

      // Content stagger animation
      gsap.from(contentRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
        }
      })

      // Skills animation
      gsap.from(skillsRef.current.children, {
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 90%",
        }
      })

      // Code block typing effect
      gsap.from(codeRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: codeRef.current,
          start: "top 85%",
        }
      })

    }, aboutRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={aboutRef} id="about" className="min-h-screen bg-zinc-200 py-8 sm:py-12 lg:py-16 relative overflow-hidden flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-4 sm:left-10 w-px h-20 sm:h-40 bg-linear-to-b from-transparent via-zinc-300 to-transparent opacity-30"></div>
        <div className="absolute bottom-1/3 right-8 sm:right-20 w-16 sm:w-32 h-px bg-linear-to-r from-transparent via-zinc-300 to-transparent opacity-30"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-zinc-400 rounded-full opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-zinc-300 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        {/* Section number */}
        <div ref={numberRef} className="absolute top-28 sm:top-16 lg:top-8 right-4 sm:right-6 lg:right-12 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-zinc-800 text-zinc-50 rounded-full flex items-center justify-center text-xs sm:text-sm font-mono">
          02
        </div>

        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-2 lg:pt-8 pt-12 sm:pt-16">
          <div className="flex items-center space-x-2 mb-4 lg:mb-2">
            <div className="w-6 sm:w-8 lg:w-12 h-px bg-zinc-400"></div>
            <span className="text-xs font-mono text-zinc-500 tracking-wider">ABOUT</span>
          </div>
          
          <h2 ref={titleRef} className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-light text-zinc-800 leading-none tracking-tight">
            Developer
            <span className="block text-zinc-500 italic" style={{ fontFamily: 'Georgia, serif' }}>
              & Designer
            </span>
          </h2>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left column - Content */}
          <div ref={contentRef} className="space-y-4 sm:space-y-6 lg:space-y-6 order-2 lg:order-1">
            <div className="space-y-3 sm:space-y-4 lg:space-y-4">
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-zinc-700 leading-relaxed font-light">
                I'm <span className="font-medium text-zinc-900">Subhradip</span>, a passionate developer who believes in the perfect blend of 
                <span className="italic text-zinc-600"> functionality</span> and <span className="italic text-zinc-600">aesthetics</span>.
              </p>
              
              <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-zinc-600 leading-relaxed">
                With a keen eye for detail and a love for clean code, I specialize in creating 
                digital experiences that not only look exceptional but also perform seamlessly 
                across all devices and platforms.
              </p>
              
              <p className="text-xs sm:text-sm lg:text-base text-zinc-500 leading-relaxed">
                When I'm not crafting code, you'll find me exploring the latest design trends, 
                experimenting with new technologies, or working on personal projects that push 
                the boundaries of creativity.
              </p>
            </div>

            {/* Skills */}
            <div className="pt-2 lg:pt-4">
              <h3 className="text-xs font-mono text-zinc-400 tracking-wider mb-3 sm:mb-4">CORE SKILLS</h3>
              <div ref={skillsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
                {[
                  'React & Next.js',
                  'TypeScript',
                  'Node.js',
                  'UI/UX Design',
                  'GSAP & Framer',
                  'Tailwind CSS',
                  'Three.js',
                  'GraphQL'
                ].map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2 lg:space-x-3 group">
                    <div className="w-1 h-1 bg-zinc-400 rounded-full group-hover:bg-zinc-600 transition-colors"></div>
                    <span className="text-xs lg:text-sm text-zinc-600 group-hover:text-zinc-800 transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Code block */}
          <div ref={codeRef} className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="bg-zinc-900 w-full max-w-xs sm:max-w-sm lg:w-80 xl:w-96 rounded-lg p-3 sm:p-4 lg:p-6 shadow-xl relative overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-zinc-400 font-mono ml-2 lg:ml-4">developer.js</span>
              </div>

              {/* Code content */}
              <div className="space-y-1 font-mono text-xs sm:text-xs lg:text-sm">
                <div className="text-zinc-400">
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-400">developer</span> = {'{'}
                </div>
                <div className="text-zinc-400 ml-2 sm:ml-3 lg:ml-4">
                  name: <span className="text-green-400">'Subhradip'</span>,
                </div>
                <div className="text-zinc-400 ml-2 sm:ml-3 lg:ml-4">
                  role: <span className="text-green-400">'Full Stack'</span>,
                </div>
                <div className="text-zinc-400 ml-2 sm:ml-3 lg:ml-4">
                  passion: <span className="text-green-400">'Amazing UX'</span>,
                </div>
                <div className="text-zinc-400 ml-2 sm:ml-3 lg:ml-4">
                  location: <span className="text-green-400">'Universe'</span>,
                </div>
                <div className="text-zinc-400 ml-2 sm:ml-3 lg:ml-4">
                  <span className="text-purple-400">skills</span>: [
                </div>
                <div className="text-zinc-400 ml-4 sm:ml-6 lg:ml-8">
                  <span className="text-green-400">'React'</span>,{' '}
                  <span className="text-green-400">'TS'</span>,
                </div>
                <div className="text-zinc-400 ml-4 sm:ml-6 lg:ml-8">
                  <span className="text-green-400">'Node'</span>,{' '}
                  <span className="text-green-400">'Design'</span>
                </div>
                <div className="text-zinc-400 ml-2 sm:ml-3 lg:ml-4">],</div>
                <div className="text-zinc-400 ml-2 sm:ml-3 lg:ml-4">
                  <span className="text-purple-400">focus</span>:{' '}
                  <span className="text-green-400">'Future'</span>
                </div>
                <div className="text-zinc-400">{'}'}</div>
              </div>

              {/* Cursor */}
              <div className="inline-block w-1 sm:w-1.5 lg:w-2 h-3 sm:h-4 lg:h-5 bg-zinc-50 ml-1 animate-pulse"></div>
            </div>

            {/* Floating stats */}
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 lg:-bottom-6 lg:-right-6 bg-zinc-800 text-zinc-50 rounded-lg p-2 sm:p-3 lg:p-4 shadow-lg">
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-light">3+</div>
                <div className="text-xs font-mono opacity-70">YEARS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 opacity-60">
          <div className="w-8 sm:w-12 h-px bg-zinc-300"></div>
          <span className="text-xs font-mono text-zinc-400 tracking-wider">SCROLL</span>
          <div className="w-8 sm:w-12 h-px bg-zinc-300"></div>
        </div>
      </div>
    </section>
  )
}
