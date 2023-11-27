import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import errorHandler from "../middlewares/error.js";

// export const getAllUsers = async (req, res) => { }

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return next(new errorHandler("User already exist",400))
        const hashedpassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedpassword });
        sendCookie(user, res, "Registered successfully", 201)
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) return next(new errorHandler("Invalid Email or password",404))
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return next(new errorHandler("Invalid Email or password",404));
        sendCookie(user, res, `Welcome back ${user.name}`, 200)
    } catch (error) {
        next(error)
    }
}

export const logout = (req,res)=>{
    res.status(200).cookie("token","",{
        expires : new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "development" ? "lax" : "none",
        secure:process.env.NODE_ENV === "development" ? "false" : "true"
    }).json({
        success:true,
    })
}

export const getMyProfile =  (req, res) => {
    res.status(200).json({
        success:true,
        user:req.user
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