import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const contactRef = useRef(null)
  const titleRef = useRef(null)
  const numberRef = useRef(null)
  const formRef = useRef(null)
  const contactInfoRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactRef.current,
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
          trigger: contactRef.current,
          start: "top 70%",
        }
      })

      // Form animation
      gsap.from(formRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
        }
      })

      // Contact info animation
      gsap.from(contactInfoRef.current.children, {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: "top 90%",
        }
      })

    }, contactRef)

    return () => ctx.revert()
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <section ref={contactRef} id="contact" className="min-h-screen bg-zinc-900 py-8 sm:py-12 lg:py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-4 sm:left-10 w-px h-20 sm:h-40 bg-linear-to-b from-transparent via-zinc-700 to-transparent opacity-40"></div>
        <div className="absolute bottom-1/3 right-8 sm:right-20 w-16 sm:w-32 h-px bg-linear-to-r from-transparent via-zinc-700 to-transparent opacity-40"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-zinc-600 rounded-full opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-zinc-700 rounded-full"></div>
        
        {/* Creative elements */}
        <div className="absolute top-1/3 left-1/2 w-40 h-40 border border-zinc-700 rounded-full opacity-10"></div>
        <div className="absolute bottom-1/5 right-1/4 w-24 h-24 border border-zinc-600 rotate-45 opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        {/* Section number */}
        <div ref={numberRef} className="absolute top-28 lg:top-8 right-4 sm:right-6 lg:right-8 w-8 h-8 lg:w-10 lg:h-10 bg-zinc-50 text-zinc-900 rounded-full flex items-center justify-center text-xs lg:text-sm font-mono shadow-lg">
          04
        </div>

        {/* Header */}
        <div className="max-sm:mt-20 mb-8 sm:mb-12 lg:mb-12">
          <div className="flex items-center space-x-4 sm:space-x-6 mb-8 lg:mt-12 lg:mb-4 sm:mb-10">
            <div className="w-16 sm:w-20 h-px bg-zinc-600"></div>
            <span className="text-xs font-mono text-zinc-400 tracking-[0.2em]">GET IN TOUCH</span>
            <div className="w-4 h-4 sm:w-6 sm:h-6 border border-zinc-700 rounded-full"></div>
          </div>
          
          <h2 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extralight text-zinc-50 leading-none tracking-tight">
            Let's Create
            <span className="block text-zinc-400 italic font-light" style={{ fontFamily: 'Georgia, serif' }}>
              Together
            </span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-1">
          {/* Contact Info */}
          <div className="lg:col-span-5">
            <div ref={contactInfoRef} className="space-y-8 lg:space-y-8">
              {/* Introduction */}
              <div className="space-y-4">
                <p className="text-sm sm:text-base lg:text-lg text-zinc-300 leading-relaxed font-light">
                  Ready to bring your vision to life? I'd love to hear about your project and 
                  explore how we can create something extraordinary together.
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Whether it's a web application, design system, or innovative digital experience, 
                  let's discuss your ideas and turn them into reality.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-2">
                <div className="group">
                  <h3 className="text-xs font-mono text-zinc-500 tracking-[0.15em] mb-1">EMAIL</h3>
                  <a 
                    href="mailto:subhradip@example.com" 
                    className="text-base lg:text-lg text-zinc-200 group-hover:text-zinc-50 transition-colors duration-300 font-light"
                  >
                    contact@subhradip.me
                  </a>
                </div>

                <div className="group">
                  <h3 className="text-xs font-mono text-zinc-500 tracking-[0.15em] mb-1">LOCATION</h3>
                  <p className="text-base lg:text-lg text-zinc-200 font-light">
                    West Bengal, India
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono text-zinc-500 tracking-[0.15em]">CONNECT</h3>
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  {[
                    { name: 'LinkedIn', url: '#' },
                    { name: 'GitHub', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Dribbble', url: '#' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="text-sm font-mono text-zinc-400 hover:text-zinc-200 transition-colors duration-300 group"
                    >
                      <span className="group-hover:tracking-wide transition-all duration-300">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="group">
                  <label className="block text-xs font-mono text-zinc-500 tracking-widest mb-2">
                    NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border-b border-zinc-700 text-zinc-200 py-2 sm:py-3 focus:border-zinc-500 focus:outline-none transition-colors duration-300 font-light text-sm sm:text-base"
                    placeholder="Your full name"
                  />
                </div>

                <div className="group">
                  <label className="block text-xs font-mono text-zinc-500 tracking-widest mb-2">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border-b border-zinc-700 text-zinc-200 py-2 sm:py-3 focus:border-zinc-500 focus:outline-none transition-colors duration-300 font-light text-sm sm:text-base"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-mono text-zinc-500 tracking-widest">
                  SUBJECT *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b border-zinc-700 text-zinc-200 py-2 sm:py-3 focus:border-zinc-500 focus:outline-none transition-colors duration-300 font-light text-sm sm:text-base"
                  placeholder="Project inquiry"
                />
              </div>

              <div className="group">
                <label className="block text-xs font-mono text-zinc-500 tracking-widest mb-2">
                  MESSAGE *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full bg-transparent border border-zinc-700 text-zinc-200 p-3 sm:p-4 focus:border-zinc-500 focus:outline-none transition-colors duration-300 resize-none font-light text-sm sm:text-base"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="group inline-flex items-center space-x-3 bg-zinc-50 text-zinc-900 px-6 sm:px-8 py-2 sm:py-3 hover:bg-zinc-200 transition-all duration-300 font-mono text-xs sm:text-sm tracking-wide"
                >
                  <span>SEND MESSAGE</span>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 border border-zinc-700 flex items-center justify-center group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-all duration-300">
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:text-zinc-50 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
