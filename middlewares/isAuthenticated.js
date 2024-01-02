import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
    try{
        const { token } = req.cookies;
    if (!token) {
        return res.status(404).json({
            success: false,
            message: "User Login Required!",
        });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = await userModel.findById(decoded._id);
    next();
    }catch(err){
        next(err);
    }
}