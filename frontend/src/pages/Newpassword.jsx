import React, { useEffect, useRef } from 'react'
import Title from '../component/Title'
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import {assets} from '../assets/frontend_assets/assets.js'
import { Eye,EyeOff} from 'lucide-react';

const Newpassword = () => {
  const newpass=useRef();
   
   const location=useLocation();
   const email=location.state?.email;
   const{backendUrl,navigate}=useContext(ShopContext)

  const [newPassword,setNewPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("")
  const [showNewPassword,setShowNewPassword]=useState(false)
  const[showConfirmPassword,setShowConfirmPassword]=useState(false)
  

  const onSubmitHandler=async(e)=>{
   e.preventDefault();
   try {
   const response=await axios.post(backendUrl +'/api/user/reset-password',{email,newPassword,confirmPassword})
    if(response.data.success){
    toast.success(response.data.message)
     navigate('/login');
    }
    else{
    toast.error(response.data.message)
    }
    
   } catch (error) {
    console.log(error)
    toast.error(error.message)
    
   }
  }
   useEffect(()=>{
    newpass.current?.focus();
   },[])


  return (
    <div className='w-full'>
    <div className='flex flex-col m-auto bg-slate-200 sm:max-w-96 w-full p-4 rounded-lg shadow-lg'>
     <Link to='/verify-otp' state={{email}}><img className='h-8 w-5 rotate-180' src={assets.dropdown_icon} alt="" /></Link>
     <div className='flex justify-center text-2xl mb-4'>
      <Title text1={'Reset'} text2={'Password'} />
     </div>
      <form onSubmit={onSubmitHandler} className=' w-full flex flex-col'>
        <label className='text-sm' 
        htmlFor='nepassword' >New Password :</label>
       <div className="relative w-full mb-4">
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full py-3 px-3 pr-10 border border-gray-800 rounded outline-none"
              type={showNewPassword ? "text" : "password"}
              id="nepassword"
              ref={newpass}
              placeholder="New Password"
              value={newPassword}
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <EyeOff /> : <Eye />}
            </span>
       </div>

      <label className='text-sm'
       htmlFor='conpassword'>Confirm Password :</label>
      <div className="relative w-full mb-4">
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full py-3 px-3 pr-10 border border-gray-800 rounded outline-none"
            type={showConfirmPassword ? "text" : "password"}
            id="conpassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            required
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </span>
     </div>

     <div className='flex justify-center'>
     <button className= ' bg-black text-white font-light py-3 px-8 rounded mt-4'>Reset Password</button>
     </div>
      </form>
    </div>
      
    </div>
  )
}

export default Newpassword
