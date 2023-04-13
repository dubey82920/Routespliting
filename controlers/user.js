
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { setcookie } from "../utils/features.js";

export const alluser=async (req,res)=>{

    const users= await User.find({}) 
res.json({
    success:true,
    users:users,
})
}


export const register=async (req,res)=>{
    const {name,email,password}=req.body
    // console.log(name,password)
    let user=await User.findOne({email})
    if(user) return res.status(404).json({
        success:false,massage:"User Already Exist"
    })
    const hashedpassword= await bcrypt.hash(password,10)
     user= await User.create({name,email,password:hashedpassword});
    setcookie(user,res,201,"Registered Successfully")
};



export const login= async (req,res,next)=>{
    const {email,password}=req.body

    const user=await User.findOne({email}).select("+password")
    if(!user) return res.status(404).json({
        success:false,massage:"Invalid Email or Password"
    })

    // const hashedpass= await bcrypt.hash(password,10);
    const is_match= await bcrypt.compare(password,user.password)
    if(!is_match) return res.status(404).json({
        success:false,massage:"Invalid Email or Password"
    })

    setcookie(user,res,200,`Welcome,${user.name}`);
}







export const getOneUser= (req,res)=>{
    

    res.status(200).json({
        success:true,
        user:req.user,
    })
    }



    export const logout= (req,res)=>{
    

        res.status(200).cookie("tokken","",{expires:new Date(Date.now())}).json({
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