import React from 'react'
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import QuizesList from '../components/QuizesList';


const Home = () => {
  return (
    <div className=''>
        <Navbar/>
        <HeroSection/>
        <QuizesList/>
    </div>
  )
}

export default Home
