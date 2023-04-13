
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
export const isAuthenticated=async(req,res,next)=>{
    const {tokken}=req.cookies;
    // console.log(tokken)
    if(!tokken) return res.status(404).json({
        success:false,massage:"You Are Not Login"
    })
const decoded= jwt.verify(tokken,process.env.JWE_SCRT)
// const user= await User.findById(decoded._id)
req.user=await User.findById(decoded._id);
next()
}