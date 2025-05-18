import express from 'express';
import UserSchema from '../models/UserSchema.js';

const router = express.Router();

// This route handles user profile related requests
// It retrieves the user's profile information based on the user ID stored in the request object
router.get('/profile', async (req, res) => {
    const user = await UserSchema.findOne({ _id: req.user.id });
    res.status(200).json({
        name: user.name,
        email: user.email,
        id: user._id,
    });
});

export default router;