 import express from 'express';

import { loginUser,registerUser,adminLogin,forgetPassword, verifyOtp,resetOtp,resetPassword } from '../controllers/userController.js';



const userRouter=express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.post('/forget-password',forgetPassword)
userRouter.post('/verify-otp',verifyOtp)
userRouter.post('/reset-otp',resetOtp)
userRouter.post('/reset-password',resetPassword)

export default userRouter;