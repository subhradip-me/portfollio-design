import React from 'react'

export default function Socials() {
  return (
    <div>
        <div className='relative w-full h-1/2 bg-white'>
                  <div className='w-full h-1/2'>
                    <img className='w-full h-full object-cover' src="https://media.licdn.com/dms/image/v2/D5616AQHbACUBlGRBgA/profile-displaybackgroundimage-shrink_350_1400/B56ZoWDozrHAAg-/0/1761306645248?e=1767225600&v=beta&t=KWtVJ-Ap3H844q4p_bGpICyXbKcBcz74oAecNLNKHU4" alt="LinkedIn Background" />
                  </div>
                  <div className='h-24 w-24 xs:h-20 xs:w-20 sm:h-32 sm:w-32 absolute top-10 xs:top-8 sm:top-12 left-2 rounded-full text-xs font-mono text-zinc-700 shadow-md overflow-hidden'>
                    <img className='object-cover w-full h-full' src="https://media.licdn.com/dms/image/v2/D5603AQFFemIQoGqbdQ/profile-displayphoto-scale_400_400/B56ZpgWOzyJwAg-/0/1762553034911?e=1767225600&v=beta&t=8hGVMIv7z3eA2iY0KI_BnQ3HF2gQwR5Hhrzk4-BcZyo" alt="Profile Picture" />
                  </div>
                </div>
                <div className='space-y-1 h-1/2 flex flex-col justify-center'>
                  <div className='px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 flex justify-start items-center flex-wrap'>
                    <h2 className='text-lg xs:text-xl sm:text-2xl lg:text-3xl font-semibold'>Subhradip Hansda</h2>
                    <MdOutlineVerifiedUser className='text-base xs:text-lg sm:text-xl lg:text-2xl text-zinc-700 ml-1 xs:ml-1.5 sm:ml-2' />
                    <span className='text-xs xs:text-sm sm:text-sm font-mono text-zinc-500 ml-1 xs:ml-1.5 sm:ml-2'>He/Him</span>
                  </div>
                  <p className='px-2 xs:px-3 sm:px-4 text-xs xs:text-sm sm:text-base leading-tight xs:leading-normal sm:leading-relaxed'>Crafting clean & interactive digital experiences | MERN Stack Developer | Java Learner</p>
                  <p className='px-2 xs:px-3 sm:px-4 text-xs xs:text-sm sm:text-[0.9rem] font-mono text-zinc-500'>Greater Kolkata Area  <span className='font-mono text-blue-800'> <a href="#contact">Contact info</a></span></p>
                </div>
    </div>
  )
}
