import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { MdOutlineVerifiedUser } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef(null)
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
  const cardContainerRef = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const card3Ref = useRef(null)
  const card4Ref = useRef(null)

  // Card container hover functions
  const handleCardHover = () => {
    gsap.to(cardContainerRef.current, {
      scale: 1.05,
      rotation: 2,
      duration: 0.8,
      ease: "power3.out"
    })
    
    // Enhance card borders on hover
    const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current]
    gsap.to(cards, {
      borderColor: '#71717a',
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    })
  }

  const handleCardLeave = () => {
    gsap.to(cardContainerRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    
    // Reset card borders
    const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current]
    gsap.to(cards, {
      borderColor: '#e4e4e7',
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.out"
    })
  }

  // Floating code hover functions
  const handleCodeHover = (ref) => {
    gsap.to(ref.current, {
      scale: 1.05,
      y: -2,
      duration: 1,
      ease: "power2.out"
    })
  }

  const handleCodeLeave = (ref) => {
    gsap.to(ref.current, {
      scale: 1,
      y: 0,
      duration: 1,
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
      
      tl.from(cardContainerRef.current, {
        scale: 0,
        rotation: -180,
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

      // Card shuffle animation
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current]
      
      // Set initial positions - stack cards on top of each other
      gsap.set(cards, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%',
        scale: 1,
        y: 0,
        x: 0,
        xPercent: -50,
        yPercent: -50,
        opacity: 1
      })

      // Initial z-index setup
      cards.forEach((card, index) => {
        gsap.set(card, {
          zIndex: cards.length - index,
          opacity: index === 0 ? 1 : 0.3
        })
      })

      // Professional minimalistic shuffle animation
      const shuffleTimeline = gsap.timeline({ 
        repeat: -1, 
        repeatDelay: 1.5,
        delay: 2
      })

      // Each card smoothly transitions
      cards.forEach((card, index) => {
        shuffleTimeline
        // Fade out and scale down current top card
        .to(card, {
          opacity: 0,
          scale: 0.98,
          y: 5,
          duration: 0.8,
          ease: "power2.inOut"
        }, index * 2)
        // Send to back
        .set(card, {
          zIndex: 0,
          y: 0
        })
        // Fade back in at the back with low opacity
        .to(card, {
          opacity: 0.3,
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        })
        // Restore z-index for next cycle
        .set(card, {
          zIndex: cards.length - index
        }, "+=0.2")
        // Reveal next card (fade in)
        .to(cards[(index + 1) % cards.length], {
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut"
        }, index * 2 + 0.4)
      })

      // Floating animation for card container
      gsap.to(cardContainerRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      })

      // ScrollTrigger animation for cards
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
          
          gsap.to(cardContainerRef.current, {
            rotation: rotation,
            scale: scale,
            y: y,
            duration: 0.3,
            ease: "none"
          })
        }
      })

      // Additional scroll-triggered parallax effect
      gsap.to(cardContainerRef.current, {
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

      {/* profile cover container with enhanced styling */}
      <div 
        ref={cardContainerRef}
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[70vw] xs:w-[70vw] xs:h-[70vw] sm:w-[30vw] sm:h-[30vw] md:w-[25vw] md:h-[30vw] lg:w-[20vw] lg:h-[24vw] cursor-pointer'
        style={{ perspective: '1000px' }}
        onMouseEnter={handleCardHover}
        onMouseLeave={handleCardLeave}
      >
        <div 
          ref={card1Ref}
          className='bg-white rounded-lg overflow-hidden border border-zinc-200 shadow-lg'
        >
          <img 
            src="https://i.pinimg.com/736x/f9/79/03/f97903fb8eae466e191059d89bf18dd0.jpg" 
            alt="Card 1" 
            className='w-full h-full object-cover'
          />
        </div>
        <div 
          ref={card2Ref}
          className='bg-white rounded-lg overflow-hidden border border-zinc-200 shadow-lg'
        >
          <img 
            src="https://i.pinimg.com/736x/f9/79/03/f97903fb8eae466e191059d89bf18dd0.jpg" 
            alt="Card 2" 
            className='w-full h-full object-cover'
          />
        </div>
        <div 
          ref={card3Ref}
          className='bg-white rounded-lg overflow-hidden border border-zinc-200 shadow-lg'
        >
          <img 
            src="https://i.pinimg.com/736x/f9/79/03/f97903fb8eae466e191059d89bf18dd0.jpg" 
            alt="Card 3" 
            className='w-full h-full object-cover'
          />
        </div>
        <div 
          ref={card4Ref}
          className='bg-white rounded-lg overflow-hidden border border-zinc-200 shadow-lg'
        >
          <img 
            src="https://i.pinimg.com/736x/f9/79/03/f97903fb8eae466e191059d89bf18dd0.jpg" 
            alt="Card 4" 
            className='w-full h-full object-cover'
          />
        </div>
      </div>  

      {/* Text content with enhanced typography */}
      <div className='relative z-10 lg:mt-0 mt-52 text-center pointer-events-none px-4 sm:px-0'>
        <div className="relative">
          <h1 
            ref={titleRef}
            className='explora-regular text-[7.5rem] sm:text-[10rem] md:text-[15rem] lg:text-[20rem] xl:text-[15rem] 2xl:text-[25rem] font-light text-zinc-500 leading-none tracking-tight relative'
          >
            Imagination
            {/* Subtle text decoration */}
            <div className="absolute -bottom-16 sm:-bottom-16 left-1/2 transform -translate-x-1/2 w-8 sm:w-16 from-transparent via-zinc-500 to-transparent"></div>
          </h1>
          
          <h2 
            ref={subtitleRef}
            className='absolute  bottom-2 sm:bottom-4 md:bottom-8 lg:bottom-12 xl:bottom-16 right-0 sm:right-2 md:right-2 lg:right-3 text-5xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-8xl 2xl:text-9xl text-zinc-800 font-light italic'
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Realized
            <span className="absolute -top-8 sm:-top-2 -right-1 sm:-right-6 text-[0.6rem] sm:text-xs font-mono text-zinc-400 not-italic">EST. 2024</span>
          </h2>
        </div>
        
        <p 
          ref={descRef}
          className='text-zinc-600 text-sm sm:text-base md:text-lg font-light mt-72 sm:mt-36 max-w-xs sm:max-w-md mx-auto leading-relaxed tracking-wide px-2 sm:px-0'
        >
          Bringing your <span className="italic text-zinc-700">ideas</span> to life through 
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>design and technology.
        </p>

        {/* Download CV Button - appears over text content */}
        
  

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
        className='absolute top-1/6 right-1/3 w-36 sm:w-44 md:w-52 p-2 sm:p-3 cursor-pointer transition-all duration-300 hover:opacity-80 hidden md:block opacity-0'
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
