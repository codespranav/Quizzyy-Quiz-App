import React, { useContext, useEffect } from 'react'
import { UserContextProvider } from '../contexts/user-context';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
    const navigate = useNavigate();
    const {userName, setUserName} = useContext(UserContextProvider);

    const onButtonClick = async () =>{
        localStorage.setItem("username", userName);
        console.log(userName)
        console.log(localStorage.getItem("username"))
        navigate("/home")
    }
  return (
    <div className='bg-[#0B1215] text-[#FAF9F6] h-screen flex justify-center items-center'>
        <div className="detailsContainer md:max-w-[60%] p-4 md:p-0">
            <h1 className='md:text-5xl text-3xl font-Poppins font-medium capitalize text-center'>Hey,🙋What's your good name?</h1>
            <div className="form max-w-full bg-white mt-8">
                <input type="text" name="" id=""  placeholder='Your Name' className='w-full p-3 rounded-md text-[#0B1215] placeholder:text-[#0B1215] outline-none cursor-default font-Poppins md:text-md text-base' onChange={(e)=>{setUserName(e.target.value)}}/>
            </div>
            <div className='mt-8 text-center bg-[#4B009C] p-2 md:w-24 rounded-md cursor-pointer mx-auto hover:bg-[#5600B2] transition-all' onClick={onButtonClick}>Test Quiz</div>
        </div>
    </div>
  )
}

export default UserDetails
