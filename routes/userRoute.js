import express from "express";
import { register, login, getMyDetail, logout} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/me", isAuthenticated, getMyDetail)
router.post("/new", register);
router.get("/login", login);
router.get("/logout", logout);


export default router;