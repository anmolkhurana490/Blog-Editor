import express from 'express';
import UserSchema from '../models/UserSchema.js';
import { signToken } from '../controllers/jwt_auth.js';

const router = express.Router();

// Authentication routes for user login, registration, and logout.

// Authenticate user and issue JWT token.
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        // email or password not provided
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await UserSchema.findOne({ email, password });
        if (!user) {
            // user with the given email and password not found
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = signToken(user);
        // Set the token in a cookie with httpOnly and maxAge options.
        res.cookie('loginToken', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: '/',
        })

        res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Register a new user.
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        // name, email or password not provided
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
            // user with the given email already exists
            return res.status(409).json({ error: 'Account already exists! Please Login.' });
        }

        // Create a new user with the provided name, email, and password.
        const user = await UserSchema.create({ name, email, password });
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Clear authentication token.
router.get('/logout', (req, res) => {
    // res.set('Cache-Control', 'no-store');
    // Clear the authentication cookie
    res.clearCookie('loginToken', { httpOnly: true, path: '/' });
    res.status(200).json({ message: 'Logout successful' });
});

export default router;