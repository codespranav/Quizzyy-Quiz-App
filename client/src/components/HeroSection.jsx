import React from 'react'
import herobg from "../assets/quizzy header.png"
const HeroSection = () => {
  return (
    <div className='w-full max-w-7xl mx-auto p-6'>
      <img src={herobg} alt="" className=' object-cover w-full max-h-[600px]' />
    </div>
  )
}

export default HeroSection
