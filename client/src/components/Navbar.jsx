import React, { useContext } from 'react'
import { CgProfile } from "react-icons/cg";
import { UserContextProvider } from '../contexts/user-context';
const Navbar = () => {
    const {userName} = useContext(UserContextProvider);
  return (
      <div className='bg-[#f5f5f5]'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto space-y-3 p-5'>
            <div className="left text-2xl uppercase font-Poppins font-bold text-[#35ae51] cursor-default select-none">Quizzyy</div>
            <div className="right flex justify-center items-center space-x-2 text-base font-Poppins bg-[#1860bf94] p-1 rounded-md cursor-pointer">
                <CgProfile className='text-xl'/><span>{userName}</span>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
