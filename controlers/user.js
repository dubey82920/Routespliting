import { User } from "../models/user.js";

export const alluser=async (req,res)=>{

    const users= await User.find({}) 
res.json({
    success:true,
    users:users,
})
}


export const saveuser=async (req,res)=>{
    const {name,email,password}=req.body
    // console.log(req.body)
    await User.create({
        name,
        email,
        password,
    })
    res.status(201).cookie("tempi","lol").json({
        success:true,
        massage:"registered successfully",
    })
    }


export const getOneUser=async (req,res)=>{
    const id=req.params.id;
    const user=await User.findById(id);
    console.log(req.params)
    res.json({
        success:true,
        user,
    })
    }