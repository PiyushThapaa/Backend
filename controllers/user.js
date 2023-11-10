import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req,res)=>{}

export const register = async (req,res)=>{
    const {name,email,password} = req.body;
    let user = await User.findOne({email});
    if (user){
        return res.json({
            success:false,
            message:"User already exist"
        })
    }
    const hashedpassword = await bcrypt.hash(password,10);
    user = await User.create({name,email,password:hashedpassword});
    sendCookie(user,res,"Registered successfully",201)
}

export const login = async (req,res)=>{
    const {email,password} = req.body;
    
    const user = await User.findOne({email}).select("+password");
    if (!user){
        return res.status(404).json({
            success:false,
            message:"Invalid Email or password"
        });
    };
    
    const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch){
        return res.status(404).json({
            success:false,
            message:"Invalid Email or password"
        })
    }
    sendCookie(user,res,`Welcome back ${user.name}`,200)
}

export const getMyProfile = async (req,res)=>{
    const id = "myid";
    const user = await User.findOne(id);
    res.status(200).json({
        success:true,
        user
    })
}

// export const special = (req,res)=>{
//     res.json({
//         success:true,
//         message:"just kidding"
//     })
// }
// export const postUserId = async (req,res)=>{
//     const {id} = req.body;
//     const user = await User.findById(id);

//     res.json({
//         success:true,
//         user
//     })
// }
// export const putUserId = async (req,res)=>{
//     const {id} = req.params;
//     const user = await User.findById(id);

//     res.json({
//         success:true,
//         message:"updated"
//     })
// }
// export const deleteUserId = async (req,res)=>{
//     const {id} = req.params;
//     const user = await User.findById(id);

//     res.json({
//         success:true,
//         message:"deleted"
//     })
// }