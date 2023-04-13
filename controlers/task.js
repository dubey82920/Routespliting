import { Task } from "../models/task.js"




export const newtask=async (req,res,next)=>{
     const {title,description}=req.body
     await Task.create({
        title,
        description,
        user:req.user,
     })
     res.status(201).json({
        success:true,
        massege:"Task Added"
     })
}


export const getMyTask =async (req,res,next)=>{
   const user=req.user;
   const task= await Task.find({user:user})
   res.status(201).json({
      success:true,
      task,
   })
}
export const updateTask= async (req,res,next)=>{

 const {id}=req.params;
const task= await Task.findById(id);

if(!task)return res.status(404).json({
   success:false,
   massage:"Task Not Found"
})

task.isCompleted=!task.isCompleted;
await task.save();

   res.status(201).json({
      success:true,
      massage:"Updated",
   })
}

export const deleteTask= async (req,res,next)=>{
   
   const {id}=req.params;
   const task= await Task.findById(id) 
   if(!task)return res.status(404).json({
      success:false,
      massage:"Task Not Found"
   })
   
   task.deleteOne();
   res.status(201).json({
      success:true,
      massage:"Deleted",
   })
}