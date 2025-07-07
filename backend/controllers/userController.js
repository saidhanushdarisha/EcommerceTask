import userModel from "../models/user.model.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendOtp } from "../utils/sendotp.js";


const createToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET)
}

// route for user login
const loginUser=async (req,res) =>{
try {
  const {email,password}=req.body;
   const user=await userModel.findOne({email});
   if(!user){
    return res.json({success:false,message:"user does not exists"})
   }
   const isMatch=await bcrypt.compare(password, user.password)
   
   if(isMatch){
   const token=createToken(user._id)
   res.json({success:true,token})
   }
   else{
    res.json({success:false,message:"Invalid credentials"})
   }

} catch (error) {
    console.log(error)
    res.json({success:false,message:error})
}

} 

// routes for forget_password

const forgetPassword=async(req,res)=>{
 const {email}=req.body;
try {
const user=await userModel.findOne({email})

if(!user){
return res.json({success:false,message:"User not Exist"});
}
const otp=Math.floor(1000+Math.random()*9000);
user.resetOtp=otp
user.resetOtpExpire=Date.now()+2*60*1000;
await user.save();
await sendOtp(email,otp)
res.json({success:true,message:'Otp send to your email'})
  
} catch (error) {
 console.log(error)
    res.json({success:false,message:error})
  
}
}

// routes for verify otp
 const verifyOtp=async(req,res)=>{
   const {email,otp}=req.body;
  try {
 
  if(!email || !otp){
   return res.json({success:false,message:"Please provide email and otp"})
  }

  const user=await userModel.findOne({email})
   if(!user){
    return res.json({success:false,message:"User not found"})

   }
   if(user.resetOtp!==otp){
   return res.json({success:false,message:"Otp is not matached"})
   }
   
   if(user.resetOtp!==otp || (user.resetOtpExpire && user.resetOtpExpire<Date.now()) ){
    return  res.json({success:false,message:"Otp is expired"})
   }
    user.resetOtp=undefined;
    user.resetOtpExpire=undefined;
    await user.save();
   res.json({success:true,message:'Otp is Verified'})
  
    
  } catch (error) {
     console.log(error)
    res.json({success:false,message:error})
  }
 }
 // routes for reset otp
  const resetOtp=async(req,res)=>{
  const {email}=req.body
  try {
   if(!email){
   return res.json({success:false,message:"Email is required"})
   }
   const user=await userModel.findOne({email})

   if(!user){
    return res.json({success:false,message:"User is not found"})
   }
   const otp=Math.floor(1000+Math.random()*9000)
   user.resetOtp=otp;
   user.resetOtpExpire=Date.now()+2*60*1000;
     await user.save()
    await sendOtp(email,otp)
    res.json({success:true, message:"Otp send to your email again"})
    
  } catch (error) {
     console.log(error)
    res.json({success:false,message:error})
  }
  
  }

  // routes for reset password
  const resetPassword=async(req,res)=>{
  const {email,newPassword,confirmPassword}=req.body;

  try {
   if(!email){
  return res.json({success:false,message:'Email is required'})
  }
  const user=await userModel.findOne({email})
  if(!user){
   return res.json({success:false,message:"User is not found"})
  }
   if(newPassword!==confirmPassword){
    return res.json({success:false,message:"Confrim password is not match"})
   }
  if(newPassword.length<8){
     return res.json({success:false, message:"please provide a strong password"})
  }

  const salt=await bcrypt.genSalt(10);
  const hashedPassword=await bcrypt.hash(newPassword,salt)
  user.password=hashedPassword;
   await user.save();
  res.json({success:true,message:"Your Password is changed"})
    
  } catch (error) {
       console.log(error)
    res.json({success:false,message:"server error"})
  } 
  }

//route for  user register
 const registerUser= async (req, res)=>{
 try {
  const {name,email,password}=req.body;

  // checking user already exist or not 
 const exists=await userModel.findOne({email});

 if(exists){
   return res.json({success:false, message:"user already exists"})
 }
  
  // validation of email and password 
  if(!validator.isEmail(email)){
   return res.json({success:false, message:"please provide valid email"})
  }
 
 if(password.length < 8){
   return res.json({success:false, message:"please provide a strong password"})
 }
  
  const salt=await bcrypt.genSalt(10);
  const hashedPassword=await bcrypt.hash(password,salt)

  const newUser=new userModel({
   name,
   email,
   password:hashedPassword

  })
  const user=await newUser.save()

  const token=createToken(user._id)
  res.json({success:true,token})
    
 } 
 catch (error) {
    console.log(error)
    res.json({success:false,message:error})
    
 }
 }

 // route for admin login

 const adminLogin=async (req, res)=>{
  try {
    const {email,password}=req.body
    if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
     const token=jwt.sign(email+password,process.env.JWT_SECRET)
    res.json({success:true,token})
      
    }
    else{
     res.json({success:false,message:"invalid credentials"})
    }
    
  } catch (error) {
     console.log(error)
    res.json({success:false,message:error})
  }
 
 }
  
  export {resetPassword,resetOtp,verifyOtp,forgetPassword,loginUser,registerUser,adminLogin}