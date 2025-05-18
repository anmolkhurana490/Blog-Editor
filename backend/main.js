import express from 'express';
import { connectDB } from './config/db.js';

import authMiddleware from './middlewares/auth_middleware.js';
import authenticate from './routes/authenticate.js';
import blogs from './routes/blogs.js';
import profile from './routes/profile.js';

import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();

// Middlewares to handle CORS, body parsing, and cookie parsing
app.use(cors({
    origin: ['http://localhost:5173', 'https://blog-editor-8i87.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connect to the database
connectDB();

// Routing and middleware setup
app.use('/api', authenticate);
app.use('/api/user', authMiddleware, profile);
app.use('/api/blogs', authMiddleware, blogs);

app.listen(5000, () => {
    console.log('Server running on port 5000')
});