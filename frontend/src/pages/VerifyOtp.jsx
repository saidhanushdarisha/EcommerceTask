import React, { useEffect, useRef, useState } from "react";
import Title from "../component/Title";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets.js";

const VerifyOtp = () => {
 
 const location=useLocation();
 const email=location.state?.email;
 const {navigate,backendUrl}=useContext(ShopContext)


  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [expired, setExpired] = useState(false);

  const inputsRef = useRef([]);
  useEffect(()=>{
  if(!email){
  toast.error("Email is not found. ...Redirecting")
   navigate('/forget-password')
  }
  
  },[email,navigate]) 

  useEffect(() => {
  inputsRef.current[0]?.focus(); 
}, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next box if value entered
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }

    // Backspace: go back
    if (!value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
     
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) 
    return alert("Enter full OTP");

    try {
    const response=await axios.post(backendUrl + '/api/user/verify-otp',{email,otp:enteredOtp})
     if(response.data.success){
     navigate('/reset-password',{state:{email}})
     setOtp(["", "", "", ""])
     toast.success(response.data.message)
     }
     else{
       toast.error(response.data.message)
       setOtp(["", "", "", ""])
     } 
    } catch (error) {
    console.log(error)
    toast.error(error.message)
      
    }
  };

  const handleResend = async () => {

  try {
    const response=await axios.post(backendUrl + '/api/user/reset-otp',{email})
    if(response.data.success){
     toast.success(response.data.message)
      console.log(response.data.message);
     setOtp(["", "", "", ""]);
    setTimeLeft(120); // Reset timer
    setExpired(false);
    inputsRef.current[0]?.focus();
    
    }
    else{
    toast.error(response.data.message)
    
    }
  } catch (error) {
   console.log(error)
   toast.error(error.message);
    
  }
     
    
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen  px-4">
      
      <div className="bg-slate-200 shadow-lg p-6 rounded-lg sm:max-w-96 w-full">
       <Link to="/forget-password"><img className="rotate-180" src={assets.dropdown_icon} alt="" /></Link>
       <div className=" flex justify-center text-2xl m-3">
        <Title  text1={'Verify'} text2={'OTP'} />
       </div>

       
        <div className="flex justify-center space-x-4 mb-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-12 h-12 text-xl text-center border border-gray-800 rounded-md focus:outline-none   px-2 focus:shadow-md focus:shadow-black"
            />
          ))}
        </div>

        <p className="text-center text-lg text-blue-600 mb-6 ">
          {formatTime(timeLeft)}
        </p>


        {expired ? (
          <button
            onClick={handleResend}
            className="w-full bg-black text-white font-light py-3 rounded transition"
          >
            Resend OTP
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-full bg-black  text-white font-light py-3 rounded transition"
          >
            Verify OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyOtp;

