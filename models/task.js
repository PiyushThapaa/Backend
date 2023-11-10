import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    desc: {
        type:String,
        required:true
    },
    action: {
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export const Task = mongoose.model("Task",userSchema)