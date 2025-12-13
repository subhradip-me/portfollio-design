import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const cursorRef = useRef(null)

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
  return (
    <div 
      ref={cursorRef}
      className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
      style={{ left: -12, top: -12 }}
    >
      <div className="w-full h-full bg-white rounded-full opacity-80"></div>
    </div>
  )
}
