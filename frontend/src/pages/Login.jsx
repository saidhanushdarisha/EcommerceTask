import React, { useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react'; // Optional: or use any icon library


  const Login=()=> {
  const [showPassword,setShowPassword]=useState(false);
   
  const [currentState,setCurrentState]=useState('Login');
  const {token,setToken,backendUrl,navigate}=useContext(ShopContext)
  const adminUrl=import.meta.env.VITE_ADMIN_URL

  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')
     const onSubmitHandler=async (event) =>{
      event.preventDefault();
      try {
      if(currentState==='Sign Up'){
       const response= await axios.post(backendUrl + '/api/user/register',{name,email,password})
        if(response.data.success){
         setToken(response.data.token)
         localStorage.setItem('token',response.data.token)
        } else{
         toast.error(response.data.message) 
        }
      
      } else{
       const response=await axios.post(backendUrl + '/api/user/login',{email,password})
       if(response.data.success){
         setToken(response.data.token)
         localStorage.setItem('token',response.data.token)
        } else{
         toast.error(response.data.message) 
        }
      
      
      }
        
      } catch (error) {
      console.log(error)
      toast.error(error.message)
        
      }
     }
     useEffect(()=>{
      if(token){
       navigate('/')
      }
     },[token])

     return(
      
      <form onSubmit={onSubmitHandler} className=" flex items-center justify-center w-full h-screen ">
        <div className="flex flex-col items-center justify-center w-[90%] sm:max-w-96 p-4 gap-4 text-gray-700  bg-slate-200 rounded-lg shadow-lg ">
        <div className="inline-flex items-center gap-2 mb-2 ">
         <p className="text-3xl">{currentState}</p>
          <hr className=" border-none h-[1.5px] w-8 bg-gray-800"/>
        </div>
         {currentState==='Login' ? '':<input onChange={(e)=>setName(e.target.value)} value={name} type="text"  placeholder="Name"  required={true} className=" w-full px-3 py-2 border border-gray-800 rounded "/>} 
         <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email"  placeholder="Email"  required={true} className=" w-full px-3 py-3 mb-4 border border-gray-800 rounded "/>
         <div className="relative w-full">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required={true}
                  className="w-full px-3 py-3 border border-gray-800 rounded pr-10"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </span>
        </div>

           <div className="w-full flex justify-between text-sm mt-[-8px]">
             <Link to={'/forget-password'} className="cursor-pointer text-blue-700 hover:underline">Forget your password?</Link>
            {
             currentState==='Login'?
             <p onClick={()=>setCurrentState('Sign Up')} className="cursor-pointer text-blue-700 hover:underline">Create Account</p>:
             <p onClick={()=>setCurrentState('Login')} className="cursor-pointer text-blue-700 hover:underline ">Login Here</p>
            }
           </div>
            <button className="bg-black text-white font-light rounded px-8 py-2 mt-4 ">{currentState==='Login'?"Sign-In":"Sign Up"}</button>
             <a href={adminUrl}  rel="noopener noreferrer">
             <button type="button" className="bg-black text-white font-light rounded px-8 py-2 mt-4">Admin Login</button>
             </a>
             </div>
      </form>
       
     
     
     )
    
    
  }
  export default Login;