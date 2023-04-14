
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { setcookie } from "../utils/features.js";
import ErrorHandeler from "../middleware/error.js";


 
export const alluser=async (req,res)=>{
try {
    
    const users= await User.find({}) 
res.json({
    success:true,
    users:users,
})
} catch (error) {
    next(error)
}
}


export const register=async (req,res,next)=>{
  try {
    const {name,email,password}=req.body
    // console.log(name,password)
    let user=await User.findOne({email})
    if(user) return  next(new ErrorHandeler("User Already Exits",404))
    const hashedpassword= await bcrypt.hash(password,10)
     user= await User.create({name,email,password:hashedpassword});
    setcookie(user,res,201,"Registered Successfully")
  } catch (error) {
    next(error)
  }
};



export const login= async (req,res,next)=>{
    try {
        const {email,password}=req.body

    const user=await User.findOne({email}).select("+password")
    if(!user) return  next(new ErrorHandeler("Invalid Email or Password",404))

    // const hashedpass= await bcrypt.hash(password,10);
    const is_match= await bcrypt.compare(password,user.password)
    if(!is_match) return  next(new ErrorHandeler("Invalid Password",404))

    setcookie(user,res,200,`Welcome,${user.name}`);
    } catch (error) {
        next(error)
    }
}







export const getOneUser= (req,res)=>{
    

    res.status(200).json({
        success:true,
        user:req.user,
    })
    }



    export const logout= (req,res)=>{
    

        res
        .status(200).cookie("tokken","",{
            expires:new Date(Date.now()),        
            SameSite:process.env.NODE_ENV==="Development"?"lex":"none",
            secure:process.env.NODE_ENV==="Development"?false:true,
        })
        .json({
            success:true,
            massage:"Logout Successfully",
        })
        }
    
    



    // export const updateUser=async (req,res)=>{
    //     const id=req.params.id;
    //     const user=await User.findById(id);
    //     // console.log(req.params)
    //     res.json({
    //         success:true,
    //         massage:"updated"
    //     })
    //     }

        
    // export const deleteUser=async (req,res)=>{
    //     const id=req.params.id;
    //     const user=await User.findById(id);
    //     // console.log(req.params)
    //     // await user.remove();
    //     res.json({
    //         success:true,
    //         massage:"deleted"
    //     })
    //     }