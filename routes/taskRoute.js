import express from "express";
import { newTask, getTask, updateTask, deleteTask } from "../controllers/taskController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const router = express.Router();

router.post("/new", isAuthenticated, newTask);
router.get("/alltask", isAuthenticated, getTask);
router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);

export default router;