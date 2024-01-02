import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();
app.listen(process.env.PORT, (req, res)=>{
    console.log(`Server is running on port ${process.env.PORT} on ${process.env.NODE_ENV} mode`);
})

  