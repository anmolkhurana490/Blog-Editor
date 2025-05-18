import mongoose from "mongoose";

// Define the schema for the blog posts
// The schema defines the structure of the blog post documents in the database

const blogSchema = new mongoose.Schema({
    title: {
        type: String, required: true,
    },
    content: {
        type: String, required: true,
    },
    tags: {
        type: [String], required: true,
    },
    status: {
        type: String, enum: ["draft", "published"], default: "draft",
    },
    created_at: {
        type: Date, default: Date.now,
    },
    updated_at: {
        type: Date, default: Date.now,
    },
});

export default mongoose.model("Blog", blogSchema);