import express from "express";
import userRouter from "./routes/user.js";
import TaskRouter from "./routes/task.js";
import {config} from "dotenv" 
import cookieParser from "cookie-parser";

config({
    path:'./data/config.env'
})
export const app=express();



// middleware
app.use(express.json());
app.use(cookieParser());


// Routers
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",TaskRouter);



