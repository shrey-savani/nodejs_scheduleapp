import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt"
import { setToken } from "../utils/featuers.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await userModel.findOne({ email }).select("+password");
        if (!user) return next(new ErrorHandler("Invalid user or password!", 401));

        const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) return res.status(401).json({ success: false, message: "Invalid Credentials!" });
        if (!isMatch) return next(new ErrorHandler("Invalid Credentials", 401));

        setToken(user, res, `Welcome Back, ${user.name}`, 201);
    } catch (e) {
        console.log("e-login", e);
        next(e);
    }
}
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await userModel.findOne({ email });
        // if (user) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "User already exists!",
        //     });
        // }
        if (user) return next(new ErrorHandler("User already exists!", 404));

        const hasedPassword = await bcrypt.hash(password, 10);
        user = await userModel.create({ name, email, password: hasedPassword });

        setToken(user, res, "Registered Successfully!", 201)
    }
    catch (e) {
        console.log("e-register", e);
        next(e);
    }
};

export const getMyDetail = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
};

export const logout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        maxAge: 30 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
    })
        .json({
            success: true,
            message: "User Logged Out"
        });
};