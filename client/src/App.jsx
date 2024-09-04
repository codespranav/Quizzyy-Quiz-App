import React, { useEffect, useState } from 'react'
import quizLogo from "./assets/quizzy logo.webp"
import { Link, useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
     setTimeout(() => {
      setLoading(false)
     }, 1000);
  }, [])
  return loading ? (  <div className='bg-gray-900 w-full h-screen  flex justify-center items-center bg-blend-screen flex-col select-none'>
  <img src={quizLogo} alt="" className='w-32 transition-all'/>
  <div className="preloader flex flex-col">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"  className="w-32 h-32">
    <circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle>
  </svg>
  </div> 
</div>) : <h1>Hello this is  me</h1> 
}

export default App
