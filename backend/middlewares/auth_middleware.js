import { verifyToken } from '../controllers/jwt_auth.js';

// This middleware checks if the user is authenticated by verifying the JWT token stored in cookies.
// If the token is valid, it decodes the token and attaches the user information to the request object.
// If the token is invalid or not present, it means the user is not LoggedIn and sends a 401 Unauthorized response.

const authMiddleware = (req, res, next) => {
    const token = req.cookies.loginToken;
    if (!token) {
        return res.status(401).json({ message: 'Please Login First' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid Token' });
    }

    req.user = decoded;
    next();
}

export default authMiddleware;