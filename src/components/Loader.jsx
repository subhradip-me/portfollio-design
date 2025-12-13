import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const textRef = useRef(null)
  const overlayRef = useRef(null)
  const counterRef = useRef(null)
  const lineRef = useRef(null)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const animateCounter = () => {
        let count = 0
        const interval = setInterval(() => {
          count += Math.floor(Math.random() * 15) + 1
          if (count >= 100) {
            count = 100
            clearInterval(interval)
            // Start exit animation after counter completes
            gsap.delayedCall(0.5, exitLoader)
          }
          setCounter(count)
        }, 80)
      }

      const exitLoader = () => {
        const tl = gsap.timeline({
          onComplete: () => {
            if (onComplete) onComplete()
          }
        })

        tl.to(counterRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.6,
          ease: "power2.inOut"
        })
        .to(lineRef.current, {
          scaleX: 0,
          duration: 0.8,
          ease: "power2.inOut"
        }, "-=0.3")
        .to(textRef.current, {
          opacity: 0,
          y: -50,
          duration: 1,
          ease: "power2.inOut"
        }, "-=0.5")
        .to(overlayRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut"
        }, "-=0.3")
        .to(loaderRef.current, {
          height: "0vh",
          duration: 0.8,
          ease: "power2.inOut"
        }, "-=0.6")
      }

      // Initial setup
      gsap.set(textRef.current, { opacity: 0, y: 50 })
      gsap.set(counterRef.current, { opacity: 0, y: 30 })
      gsap.set(lineRef.current, { scaleX: 0 })
      gsap.set(overlayRef.current, { yPercent: 100 })

      // Entrance animation
      const entranceTl = gsap.timeline()
      
      entranceTl.to(overlayRef.current, {
        yPercent: 0,
        duration: 1,
        ease: "power3.out"
      })
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.6")
      .to(lineRef.current, {
        scaleX: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8")
      .to(counterRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5")
      .call(animateCounter, null, "-=0.2")

      // Text animation effects
      const letters = textRef.current?.querySelectorAll('.letter')
      if (letters) {
        gsap.fromTo(letters, 
          { 
            opacity: 0,
            rotationX: 90,
            transformOrigin: "center bottom"
          },
          {
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)",
            delay: 0.8
          }
        )
      }

    }, loaderRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div 
      ref={loaderRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Background overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-linear-to-br from-zinc-900 via-zinc-800 to-black"
      />

      {/* Main content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white">
        
        {/* Main text */}
        <div ref={textRef} className="mb-12">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight">
            {'SUBHRADIP'.split('').map((letter, index) => (
              <span key={index} className="letter inline-block">
                {letter}
              </span>
            ))}
          </h1>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <div 
              ref={lineRef}
              className="h-px bg-zinc-400 w-24 origin-left"
            />
            <span className="text-lg font-light tracking-[0.3em] text-zinc-300">
              PORTFOLIO
            </span>
            <div 
              ref={lineRef}
              className="h-px bg-zinc-400 w-24 origin-right"
            />
          </div>
        </div>

        {/* Counter */}
        <div ref={counterRef} className="text-center">
          <div className="text-7xl md:text-8xl font-thin text-zinc-300 mb-2 font-mono">
            {counter.toString().padStart(3, '0')}
          </div>
          <div className="text-sm tracking-[0.2em] text-zinc-500 uppercase">
            Loading Experience
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-8 left-8">
          <div className="w-12 h-px bg-zinc-600"></div>
          <div className="w-px h-12 bg-zinc-600 mt-2"></div>
        </div>
        
        <div className="absolute bottom-8 right-8">
          <div className="w-12 h-px bg-zinc-600"></div>
          <div className="w-px h-12 bg-zinc-600 mt-2 ml-auto"></div>
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <p className="text-xs text-zinc-500 tracking-wider">
            CREATIVE DEVELOPER • EST. 2024
          </p>
        </div>
      </div>
    </div>
  )
}


