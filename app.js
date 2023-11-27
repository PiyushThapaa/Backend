import express from "express";
import userRouter from "./routes/user.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

config({
    path:"./data/config.env"
})

export const app = express();

//Using Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

// Using Routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);

app.get('/',(req,res)=>{
    res.send("Working")
})

// Using error errorMiddleware
app.use(errorMiddleware)