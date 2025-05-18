import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
// This function connects to the MongoDB database using Mongoose
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/Blog-Editor`);
        // console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
    }
};

export { connectDB };