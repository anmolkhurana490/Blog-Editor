import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// JWT authentication utility functions.
// This module provides functions to sign and verify JSON Web Tokens (JWTs).

// Generates a JWT for a given user object.
const signToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET
    );
}

// Verifies a JWT and returns the decoded payload or null if invalid.
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return null;
        return decoded;
    });
}

export { signToken, verifyToken };