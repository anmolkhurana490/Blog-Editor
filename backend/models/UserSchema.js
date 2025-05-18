import mongoose from 'mongoose';

// Define the User schema
// This schema defines the structure of the User document in the MongoDB database

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

export default mongoose.model('User', userSchema);