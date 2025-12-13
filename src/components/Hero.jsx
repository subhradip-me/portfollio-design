import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef(null)
  const imageRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descRef = useRef(null)
  const floatingCodeRef = useRef(null)
  const arrowFuncRef = useRef(null)
  const variableRef = useRef(null)
  const classRef = useRef(null)
  const methodRef = useRef(null)
  const importRef = useRef(null)
  const quoteRef = useRef(null)
  const downloadBtnRef = useRef(null)
  
  const [showDownloadBtn, setShowDownloadBtn] = useState(false)

  // Hover animation functions
  const handleImageHover = () => {
    setShowDownloadBtn(true)
    
    gsap.to(imageRef.current, {
      scale: 1.05,
      rotation: 3,
      duration: 0.8,
      ease: "power3.out"
    })
    
    gsap.to(imageRef.current.querySelector('.floating-number'), {
      scale: 1.2,
      rotation: 360,
      duration: 0.8,
      ease: "back.out(1.7)"
    })

    // Animate the resume content sections
    gsap.to(imageRef.current.querySelectorAll('h4'), {
      color: '#18181b',
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    })

    // Animate the skill dots and lines
    gsap.to(imageRef.current.querySelectorAll('.h-px'), {
      scaleX: 1.1,
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.out"
    })

    // Show download button with animation
    if (downloadBtnRef.current) {
      gsap.to(downloadBtnRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
      })
    }
  }

  const handleImageLeave = () => {
    // Hide the button immediately when leaving resume
    setShowDownloadBtn(false)
    
    gsap.to(imageRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    
    gsap.to(imageRef.current.querySelector('.floating-number'), {
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    })

    // Reset resume content
    gsap.to(imageRef.current.querySelectorAll('h4'), {
      color: '#27272a',
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.out"
    })

    gsap.to(imageRef.current.querySelectorAll('.h-px'), {
      scaleX: 1,
      duration: 0.6,
      stagger: 0.03,
      ease: "power2.out"
    })

    // Hide download button with animation
    if (downloadBtnRef.current) {
      gsap.to(downloadBtnRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power2.in"
      })
    }
  }

  // Floating code hover functions
  const handleCodeHover = (ref) => {
    gsap.to(ref.current, {
      scale: 1.05,
      y: -5,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleCodeLeave = (ref) => {
    gsap.to(ref.current, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states for floating elements
      gsap.set([floatingCodeRef.current, arrowFuncRef.current, variableRef.current], {
        y: 50,
        opacity: 0
      })
      gsap.set([classRef.current, methodRef.current, importRef.current], {
        x: 30,
        opacity: 0
      })
      gsap.set(quoteRef.current, {
        scale: 0.8,
        opacity: 0
      })

      // Hero entrance animation
      const tl = gsap.timeline({ delay: 0.5 })
      
      tl.from(imageRef.current, {
        scale: 0,
        rotatetion: -180,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      .from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      .from(subtitleRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .from(descRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")

      // Floating code elements entrance animations
      tl.to([floatingCodeRef.current, arrowFuncRef.current, variableRef.current], {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=0.4")
      .to([classRef.current, methodRef.current, importRef.current], {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.6")
      .to(quoteRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.3")

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      })

      // Subtle floating animations for code elements
      gsap.to(floatingCodeRef.current, {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      gsap.to(arrowFuncRef.current, {
        x: 5,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      gsap.to(classRef.current, {
        rotation: 1,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      // ScrollTrigger animation for image
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const rotation = progress * 15
          const scale = 1 + (progress * 0.3)
          const y = progress * -100
          
          gsap.to(imageRef.current, {
            rotation: rotation,
            scale: scale,
            y: y,
            duration: 0.3,
            ease: "none"
          })
        }
      })

      // Additional scroll-triggered parallax effect for the image
      gsap.to(imageRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })

    }, heroRef)

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      ctx.revert()
    }
  }, [])

  return (
    <section 
      ref={heroRef}
      id="home" 
      className='w-full h-screen  from-zinc-50 via-zinc-100 to-zinc-200 flex items-center justify-center relative overflow-hidden p-5'
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-px h-32  from-transparent via-zinc-300 to-transparent opacity-40"></div>
        <div className="absolute bottom-32 right-16 w-24 h-px  from-transparent via-zinc-300 to-transparent opacity-40"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-zinc-400 rounded-full opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-zinc-300 rounded-full"></div>
      </div>

      {/* Resume container with enhanced styling */}
      <div 
        ref={imageRef}
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[25vw] sm:w-[40vw] sm:h-[25vw] md:w-[35vw] md:h-[20vw] lg:w-[25vw] lg:h-[15vw] overflow-hidden group cursor-pointer'
        onMouseEnter={handleImageHover}
        onMouseLeave={handleImageLeave}
      >
        <div className="relative w-full h-full rounded-lg shadow-lg bg-white border border-zinc-200/60">
          {/* Resume Document */}
          <div className="w-full h-full p-3 sm:p-4 md:p-5 flex flex-col justify-between rounded-lg text-xs">
            
            {/* Header */}
            <div className="space-y-1">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 tracking-tight uppercase">SUBHRADIP HANSDA</h3>
                  <p className="text-xs text-zinc-600 font-medium tracking-wide uppercase">Frontend-Focused Full-Stack</p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-zinc-100 rounded border ml-2"></div>
              </div>
              <div className="h-px bg-zinc-300 w-full"></div>
            </div>

            {/* Contact & Summary */}
            <div className="flex-1 space-y-3">
              
              {/* Contact */}
              <div className="space-y-1">
                <h4 className="text-xs text-zinc-900 font-bold uppercase tracking-wide">Contact</h4>
                <div className="space-y-0.5 text-xs text-zinc-700">
                  <div>Phone: 9832634461</div>
                  <div>Email: subhradip.info@gmail.com</div>
                  <div>Address: Anukhal, Kalna, Purba Bardhaman</div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="space-y-1">
                <h4 className="text-xs text-zinc-900 font-bold uppercase tracking-wide">Professional Summary</h4>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  A frontend and full-stack developer with a strong focus on creating clean, responsive, and visually engaging interfaces using React, Tailwind, GSAP, and Framer Motion.
                </p>
              </div>

              {/* Technical Skills */}
              <div className="space-y-1">
                <h4 className="text-xs text-zinc-900 font-bold uppercase tracking-wide">Technical Skills</h4>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-zinc-800">Frontend</div>
                    <div className="text-zinc-600">HTML5, CSS3, JavaScript</div>
                    <div className="text-zinc-600">React.js, Tailwind CSS</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-semibold text-zinc-800">Backend</div>
                    <div className="text-zinc-600">Node.js, Express.js</div>
                    <div className="text-zinc-600">MongoDB, REST APIs</div>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-1">
                <h4 className="text-xs text-zinc-900 font-bold uppercase tracking-wide">Projects</h4>
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-zinc-800 font-medium">Portfolio Website</span>
                    <span className="text-xs text-zinc-500">2024</span>
                  </div>
                  <div className="text-xs text-zinc-600">React, GSAP, Tailwind CSS</div>
                  <div className="w-full h-px bg-zinc-200"></div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="space-y-1">
              <div className="h-px bg-zinc-300 w-full"></div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500">Updated 2024</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-zinc-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-zinc-300 rounded-full"></div>
                  <div className="w-1 h-1 bg-zinc-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating CV Badge */}
          <div className="floating-number absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-zinc-900 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-mono">
            CV
          </div>

          {/* Paper texture overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-transparent via-zinc-100/30 to-zinc-200/40 rounded-lg pointer-events-none"></div>
        </div>
      </div>  

      {/* Text content with enhanced typography */}
      <div className='relative z-10 text-center pointer-events-none px-4 sm:px-0'>
        <div className="relative">
          <h1 
            ref={titleRef}
            className='explora-regular text-[7.5rem] sm:text-[10rem] md:text-[15rem] lg:text-[20rem] xl:text-[15rem] 2xl:text-[25rem] font-light text-zinc-500 leading-none tracking-tight relative'
          >
            Imagination
            {/* Subtle text decoration */}
            <div className="absolute -bottom-4 sm:-bottom-8 left-1/2 transform -translate-x-1/2 w-8 sm:w-16 h-px from-transparent via-zinc-500 to-transparent"></div>
          </h1>
          
          <h2 
            ref={subtitleRef}
            className='absolute bottom-2 sm:bottom-4 md:bottom-8 lg:bottom-12 xl:bottom-16 right-0 sm:right-2 md:right-2 lg:right-3 text-5xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-8xl 2xl:text-9xl text-zinc-800 font-light italic'
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Realized
            <span className="absolute -top-8 sm:-top-2 -right-1 sm:-right-6 text-[0.6rem] sm:text-xs font-mono text-zinc-400 not-italic">EST. 2024</span>
          </h2>
        </div>
        
        <p 
          ref={descRef}
          className='text-zinc-600 text-sm sm:text-base md:text-lg font-light mt-4 sm:mt-6 max-w-xs sm:max-w-md mx-auto leading-relaxed tracking-wide px-2 sm:px-0'
        >
          Bringing your <span className="italic text-zinc-700">ideas</span> to life through 
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>design and technology.
        </p>

        {/* Download CV Button - appears over text content */}
        <div 
          ref={downloadBtnRef}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-all duration-500 z-30 ${
            showDownloadBtn ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ opacity: 0, transform: 'translate(-50%, -50%) scale(0.9)' }}
        >
          <button 
            className="bg-zinc-900 text-white px-6 py-3 rounded-full text-sm font-mono tracking-wide hover:bg-zinc-800 transition-all duration-300 hover:scale-105 flex items-center space-x-3 shadow-xl backdrop-blur-sm border border-zinc-700/50"
            onClick={() => {
              // Create and trigger download
              const link = document.createElement('a')
              link.href = '/cv.pdf' // Replace with your CV file path
              link.download = 'Subhradip_Hansda_CV.pdf'
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>DOWNLOAD CV</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute -bottom-50 sm:-bottom-30 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-1 sm:space-y-2 opacity-60">
          <span className="text-[0.6rem] sm:text-xs font-mono text-zinc-500 tracking-wider">SCROLL</span>
          <div className="w-px h-6 sm:h-8 bg-linear-to-b from-zinc-400 to-transparent animate-pulse"></div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 sm:bottom-12 left-4 sm:left-12 flex items-center space-x-2 sm:space-x-4 text-zinc-500">
        <div className="w-4 sm:w-8 h-px bg-zinc-400"></div>
        <span className="text-[0.6rem] sm:text-xs font-mono tracking-wider">CREATIVE DEVELOPMENT</span>
      </div>

      <div className="absolute top-20 sm:top-12 right-4 sm:right-12 text-right text-zinc-500">
        <div className="text-[0.6rem] sm:text-xs font-mono tracking-wider">PORTFOLIO</div>
        <div className="text-[0.6rem] sm:text-xs font-mono tracking-wider opacity-60">2025</div>
      </div>

      {/* Floating code snippet - minimalist */}
      <div 
        ref={floatingCodeRef}
        className='absolute top-16 sm:top-24 lg:top-24 left-4 lg:left-28 sm:left-8 w-72 sm:w-80 md:w-96 p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:opacity-80 opacity-0'
        onMouseEnter={() => handleCodeHover(floatingCodeRef)}
        onMouseLeave={() => handleCodeLeave(floatingCodeRef)}
      >
        <div className="font-light text-xs sm:text-sm leading-loose tracking-wide" style={{ fontFamily: 'SF Mono, Monaco, monospace' }}>
          <div className="text-zinc-700">
            <span className="text-zinc-600 opacity-70">function</span>
            <span className="text-zinc-900 font-medium"> Feature</span>
            <span className="text-zinc-500">(</span>
            <span className="text-zinc-700 italic">focus, discipline, passion</span>
            <span className="text-zinc-500">) {'{'}</span>
          </div>
          <div className="pl-6 text-zinc-600">
            <span className="text-zinc-500">return</span>
            <span className="text-zinc-800 font-medium"> growth</span>
            <span className="text-zinc-500">;</span>
          </div>
          <div className="text-zinc-500">{'}'}</div>
        </div>
      </div>

      {/* Floating arrow function - elegant */}
      <div 
        ref={arrowFuncRef}
        className='absolute top-1/3 right-8 sm:right-16 lg:right-24 w-48 sm:w-56 p-2 sm:p-3 cursor-pointer transition-all duration-300 hover:opacity-80 opacity-0'
        onMouseEnter={() => handleCodeHover(arrowFuncRef)}
        onMouseLeave={() => handleCodeLeave(arrowFuncRef)}
      >
        <div className="font-light text-[0.6rem] sm:text-xs leading-loose tracking-wider" style={{ fontFamily: 'Inter, system-ui' }}>
          <span className="text-zinc-400">const</span>
          <span className="text-zinc-700 font-medium"> create</span>
          <span className="text-zinc-400"> = </span>
          <span className="text-zinc-600 italic">(idea)</span>
          <span className="text-zinc-400"> {'='}{'>'}  </span>
          <span className="text-zinc-800 font-semibold">reality</span>
        </div>
      </div>

      {/* Floating variable declaration - subtle (hidden on mobile) */}
      <div 
        ref={variableRef}
        className='absolute bottom-1/3 left-8 sm:left-16 lg:left-32 w-40 sm:w-48 p-2 sm:p-3 cursor-pointer transition-all duration-300 hover:opacity-80 hidden sm:block opacity-0'
        onMouseEnter={() => handleCodeHover(variableRef)}
        onMouseLeave={() => handleCodeLeave(variableRef)}
      >
        <div className="font-extralight text-[0.6rem] sm:text-xs leading-relaxed tracking-widest" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          <span className="text-zinc-400 uppercase">let</span>
          <span className="text-zinc-600"> skills</span>
          <span className="text-zinc-400"> = </span>
          <span className="text-zinc-500">[</span>
          <span className="text-zinc-700">'design', 'code'</span>
          <span className="text-zinc-500">]</span>
        </div>
      </div>

      {/* Floating class definition - modern (repositioned for mobile) */}
      <div 
        ref={classRef}
        className='absolute bottom-8 sm:bottom-4 right-4 sm:right-12 lg:right-20 w-44 sm:w-52 md:w-60 p-2 sm:p-3 cursor-pointer transition-all duration-300 hover:opacity-80 opacity-0'
        onMouseEnter={() => handleCodeHover(classRef)}
        onMouseLeave={() => handleCodeLeave(classRef)}
      >
        <div className="font-light text-[0.5rem] sm:text-[0.6rem] md:text-xs leading-loose" style={{ fontFamily: 'Fira Code, monospace' }}>
          <div className="text-zinc-600">
            <span className="text-zinc-400">class</span>
            <span className="text-zinc-800 font-semibold"> Dev</span>
            <span className="hidden sm:inline text-zinc-800 font-semibold">eloper</span>
            <span className="text-zinc-400"> {'{'}</span>
          </div>
          <div className="pl-3 sm:pl-4 text-zinc-600">
            <span className="text-zinc-700">passion</span>
            <span className="text-zinc-400"> = </span>
            <span className="text-zinc-800 font-medium">true</span>
          </div>
          <div className="text-zinc-400">{'}'}</div>
        </div>
      </div>

      {/* Floating method - clean (hidden on small mobile) */}
      <div 
        ref={methodRef}
        className='absolute top-1/4 right-1/3 w-36 sm:w-44 md:w-52 p-2 sm:p-3 cursor-pointer transition-all duration-300 hover:opacity-80 hidden md:block opacity-0'
        onMouseEnter={() => handleCodeHover(methodRef)}
        onMouseLeave={() => handleCodeLeave(methodRef)}
      >
        <div className="font-extralight text-[0.6rem] sm:text-xs leading-relaxed tracking-wide" style={{ fontFamily: 'Source Code Pro, monospace' }}>
          <div className="text-zinc-600">
            <span className="text-zinc-500">solve</span>
            <span className="text-zinc-400">(</span>
            <span className="text-zinc-600 italic">problem</span>
            <span className="text-zinc-400">)</span>
          </div>
          <div className="text-zinc-700 pl-2">
            <span className="text-zinc-500">return</span>
            <span className="text-zinc-800 font-medium"> solution</span>
          </div>
        </div>
      </div>

      {/* Floating import statement - minimalist (repositioned) */}
      <div 
        ref={importRef}
        className='absolute top-36 sm:top-40 md:top-48 left-1/4 w-28 sm:w-36 md:w-44 p-2 sm:p-3 cursor-pointer transition-all duration-300 hover:opacity-80 opacity-0'
        onMouseEnter={() => handleCodeHover(importRef)}
        onMouseLeave={() => handleCodeLeave(importRef)}
      >
        <div className="font-light text-[0.5rem] sm:text-[0.6rem] md:text-xs tracking-wider" style={{ fontFamily: 'Menlo, monospace' }}>
          <span className="text-zinc-400">import</span>
          <span className="text-zinc-700 font-medium"> creativity</span>
          <div className="hidden sm:inline">
            <span className="text-zinc-400"> from</span>
            <span className="text-zinc-600"> 'mind'</span>
          </div>
        </div>
      </div>

      {/* Floating philosophy - typographic (mobile optimized) */}
      <div 
        ref={quoteRef}
        className='absolute bottom-16 sm:bottom-24 md:bottom-32 right-4 sm:right-8 max-w-xs p-2 sm:p-3 md:p-4 cursor-pointer transition-all duration-300 hover:opacity-80 opacity-0'
        onMouseEnter={() => handleCodeHover(quoteRef)}
        onMouseLeave={() => handleCodeLeave(quoteRef)}
      >
        <blockquote className="text-zinc-600 text-[0.6rem] sm:text-xs md:text-sm font-light leading-relaxed tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
          <span className="text-zinc-800 italic font-normal">"Code is poetry</span>
          <br />
          <span className="text-zinc-500 text-[0.5rem] sm:text-[0.6rem] md:text-xs font-mono tracking-widest">written in logic"</span>
        </blockquote>
        <div className="mt-2 sm:mt-3 text-zinc-400 text-[0.4rem] sm:text-[0.5rem] md:text-[0.6rem] font-mono tracking-widest uppercase">
          — Dev Philosophy
        </div>
      </div>
    </section>
  )
}
