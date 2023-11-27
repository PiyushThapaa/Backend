import mongoose from "mongoose";
import { Task } from "../models/task.js";
import errorHandler from "../middlewares/error.js";


export const newTask = (req, res, next) => {
    try {
        const { title, description, action } = req.body;
    Task.create({ title, description, action, user: req.user });
    res.status(200).json({
        success: true,
        message: "Task Added Successfully."
    })
    } catch (error) {
        next(error);
    }
}

export const getMyTask = async (req, res, next) => {
    try {
        const userid = req.user._id;
    const allTasks = await Task.find({ user: userid });
    res.status(200).json({
        success: true,
        allTasks
    })
    } catch (error) {
        next(error);
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
        
        if (!isValidObjectId) {
            return next(new errorHandler("Invalid ObjectId",400))
        }
        
        const task = await Task.findById(req.params.id);
    
        if (!task) {
            return next(new errorHandler("Id not found",404))
        }
        task.action = !task.action;
        await task.save();
        res.status(200).json({
            success: true,
            message: "Updated"
        })
    }
    catch (err) {
        next(err);
    }
}
export const deleteTask = async (req, res, next) => {
    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
            
        if (!isValidObjectId) {
            return next(new errorHandler("Invalid ObjectId",400))
        }
        
        const task = await Task.findById(req.params.id);
    
        if (!task) {
            return next(new errorHandler("Id not found",404))
        }
        await task.deleteOne();
        res.status(200).json({
            success: true,
            message: "Task Deleted"
        })
    } catch (error) {
        next(error);
    }
}