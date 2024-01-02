import mongoose from "mongoose"

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, { dbName: "authDatabase" })
        .then(() => { console.log('Connected to MongoDB'); })
        .catch(e => console.log(e))
}