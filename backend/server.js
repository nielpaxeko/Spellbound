import express from "express";
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import wanderlog from './routes/wanderlog.js';
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const PORT = 3000;

dotenv.config();

// CORS setup
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use existing route files
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Use the new countries and cities routes
app.use("/api/wanderlogs", wanderlog);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
