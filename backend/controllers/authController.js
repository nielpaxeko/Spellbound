import { createUser, findUserByEmail, findUserByUsername } from "../models/userModel.js";

// Signup Controller
export const signup = async (req, res) => {
    const { firstName, lastName, username, country_of_origin, email, password, confirmPassword } = req.body;

    // Basic password validation
    if (password !== confirmPassword) {
        console.error("Passwords do not match");
        return res.status(400).json({ message: "Passwords do not match" });
    }
    if (password.length < 8) {
        console.error("Password must be at least 8 characters long");
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }
    try {
        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            console.error("User already exists");
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Create a new user
        const user = await createUser(firstName, lastName, username, email, password, country_of_origin);
        req.login(user, (err) => {
            if (err) {
                console.error("Login error:", err);
                return res.status(500).json({
                    message: 'Error during login'
                });
            }
            console.log("User created successfully");
            return res.status(201).json({
                message: "User created successfully",
                user
            });
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

export const checkAuthStatus = (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({
            isAuthenticated: true,
            user: req.user
        });
    } else {
        return res.json({
            isAuthenticated: false
        });
    }
};

// Get Current User's ID
export const getCurrentUser = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ username: req.user.username });
       
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Get a specific user's profile by ID
export const getUserProfile = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await findUserByUsername(username);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.profile_picture) {
            user.profile_picture = user.profile_picture.toString('base64'); 
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ error: 'Server error' });
    }
};







