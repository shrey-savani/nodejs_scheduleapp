import express from "express"
import userRoute from "./routes/userRoute.js"
import taskRoute from "./routes/taskRoute.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js"
import cors from "cors";

export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"]
}));

config({
    path: "./data/config.env",
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/task", taskRoute)

app.get("/", (req, res) => {
    res.send("Working Well")
})

app.use(errorMiddleware);