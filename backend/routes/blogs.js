import express from 'express';
import BlogsSchema from '../models/BlogsSchema.js';

// Express router for handling blog-related routes.
const router = express.Router();

// Retrieves all blog entries from the database.
router.get('/', async (req, res) => {
    const blogsData = await BlogsSchema.find();
    res.json(blogsData);
});

// Retrieves a single blog entry by its ID.
router.get('/:id', async (req, res) => {
    const blogId = req.params.id;
    const blogData = await BlogsSchema.findOne({ _id: blogId });
    res.json(blogData);
});

// Saves a blog as a draft.
// If an ID is provided, updates the existing draft; otherwise, creates a new draft.
router.post('/save-draft', async (req, res) => {
    const { id, title, content, tags } = req.body;

    if (!title || !content || !tags) {
        // title, content or tags not provided
        console.log(title, content, tags);
        return res.status(400).json({ error: 'Invalid blog data' });
    }

    let newBlog = {
        title, content, tags,
        status: 'draft',
        updated_at: Date.now(),
    };

    if (id) {
        // update existing drafted blog
        await BlogsSchema.updateOne({ _id: id }, newBlog);
        res.status(201).json({ id });
    }
    else {
        // create new drafted blog 
        newBlog = await BlogsSchema.create(newBlog);
        res.status(201).json({ id: newBlog._id });
    }
});

// Publishes a blog.
// If an ID is provided, updates the existing blog; otherwise, creates a new published blog.
router.post('/publish', async (req, res) => {
    const { id, title, content, tags } = req.body;

    if (!title || !content || !tags) {
        // title, content or tags not provided
        return res.status(400).json({ error: 'Invalid blog data' });
    }

    let newBlog = {
        title, content, tags,
        status: 'published',
        updated_at: Date.now(),
    };

    if (id) {
        // update existing published blog
        await BlogsSchema.updateOne({ _id: id }, newBlog);
        res.status(201).json({ id });
    }
    else {
        // create new published blog
        newBlog = await BlogsSchema.create(newBlog);
        res.status(201).json({ id: newBlog._id });
    }
});

export default router;