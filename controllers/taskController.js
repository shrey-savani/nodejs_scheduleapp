import ErrorHandler from "../middlewares/error.js";
import { taskModel } from "../models/taskModel.js";

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await taskModel.create({
            title,
            description,
            user: req.user
        });

        res.status(201).json({
            success: true,
            message: "Task Added!"
        })
    } catch (err) {
        next(err);
    }

}

export const getTask = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const task = await taskModel.find({ user: userId });
        if (!task) return res.status(404).json({ success: false, msg: "No Task Found" });

        res.status(201).json({
            success: true,
            task
        })
    } catch (err) {
        next(err)
    }
}

export const updateTask = async (req, res, next) => {

    try {
        const userId = req.params.id;
        const task = await taskModel.findById(userId);
        if (!task) return next(new ErrorHandler("No Task Found!", 400));

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(201).json({
            success: true,
            message: "Task Updated!"
        })
    } catch (err) {
        next(err);
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const task = await taskModel.findById(userId);
        if (!task) return next(new ErrorHandler("No Task Found!", 400));

        await task.deleteOne();

        res.status(201).json({
            success: true,
            message: "Task Deleted!"

        })
    } catch (err) {
        next(err);
    }
}