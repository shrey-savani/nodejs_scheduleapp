import mongoose from "mongoose"

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, { dbName: "authDatabase" })
        .then((c) => { console.log(`Connected to MongoDB ${c.connection.host}`); })
        .catch(e => console.log(e))
}