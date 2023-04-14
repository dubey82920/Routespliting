import { Task } from "../models/task.js"


import ErrorHandeler from "../middleware/error.js"

export const newtask=async (req,res,next)=>{
    try {
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
    } catch (error) {
      next(error)
    }
}


export const getMyTask =async (req,res,next)=>{
   try {
      const user=req.user;
   const task= await Task.find({user:user})
   res.status(201).json({
      success:true,
      task,
   })
   } catch (error) {
      next(error)
   }
}
export const updateTask= async (req,res,next)=>{

 try {
   const {id}=req.params;
const task= await Task.findById(id);

if(!task)return  next(new ErrorHandeler("Invalid Id",404))

task.isCompleted=!task.isCompleted;
await task.save();

   res.status(201).json({
      success:true,
      massage:"Updated",
   })
 } catch (error) {
   next(error)
 }
}

export const deleteTask= async (req,res,next)=>{
   
   try {
      const {id}=req.params;
   const task= await Task.findById(id) 
   if(!task)return  next(new ErrorHandeler("Invalid Id",404))
   
   task.deleteOne();
   res.status(200).json({
      success:true,
      massage:"Deleted",
   })
   } catch (error) {
      next(error)
   }
}