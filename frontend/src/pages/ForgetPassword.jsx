import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import {assets} from '../assets/frontend_assets/assets.js'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRef } from 'react'
import { useEffect } from 'react'



const ForgetPassword = () => {
const emailRef=useRef();
const {navigate,backendUrl} =useContext(ShopContext)
 const [email,setEmail]=useState('')

 const onsubmitHandler=async(event)=>{
 event.preventDefault();
  if(!email){
   toast.error("Please provide a Email.")
  }
 try {
    const response=await axios.post(backendUrl +'/api/user/forget-password', {email})
    if(response.data.success){
    toast.success(response.data.message)
    navigate('/verify-otp',{state:{email}});
    }
  
 } catch (error) {
  
 }
 }
  useEffect(()=>{
   emailRef.current?.focus();
  
  },[])


  return (
    <div className='w-full'>
    <div className='bg-slate-200 w-[90%] sm:max-w-96 flex-col m-auto p-3 rounded-lg shadow-lg'>
     <Link to={'/login'}>
      <img className="rotate-180" src={assets.dropdown_icon} alt='' /></Link>
      <form onSubmit={onsubmitHandler} className='flex-col mt-5'>
        <div className="flex justify-center gap-2 mb-4 text-2xl">
        <Title text1={"Forget"} text2={"Password"} />
         </div>
        <input onChange={(e)=>setEmail(e.target.value)}  className=" w-full py-3 px-3 border border-gray-800 rounded mb-7 outline-none"
         value={email} 
        type='email'
        ref={emailRef}
        placeholder='Enter your email'
        required />
         <div className='w-full flex justify-center items-center '>
        <button  type='submit' className='text-white bg-black py-3 px-8 font-light mt-4' >GENERATE OTP</button>
         </div>
      </form>
      </div>
    </div>
  )
}

export default ForgetPassword
