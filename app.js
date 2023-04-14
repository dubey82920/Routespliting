import express from "express";
import userRouter from "./routes/user.js";
import TaskRouter from "./routes/task.js";
import {config} from "dotenv" 
import cookieParser from "cookie-parser";
import {errorMiddleware} from "./middleware/error.js"
import cors from"cors"


config({
    path:'./data/config.env'
})
export const app=express();



// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONT_END_URL],
    methods:["GET","POST","PUT","delete"],
    credentials:true


}))

// Routers
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",TaskRouter);


app.use(errorMiddleware)



