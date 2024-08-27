import express from "express";
import { signup, checkAuthStatus, getCurrentUser, getUserProfile } from "../controllers/authController.js";
import { updateUserProfile } from "../models/userModel.js"
import passport from "passport";

const router = express.Router();

// Chech auth status
function loggedIn(req, res, next) {
    if (req.user) {
        return next();
    } else {
        return res.redirect('/landing');
    }
}

// Signup
router.post("/signup", signup);

// Login
router.post("/login", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Server error', error: err });
        }
        if (!user) {
            return res.status(400).json({ message: info?.message || 'Invalid credentials' });
        }
        // Log the user in
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Login failed', error: err });
            }
            return res.status(200).json({ message: 'Login successful' });
        });
    })(req, res, next);
});

// Home
router.get("/home", loggedIn, (req, res) => {
    res.send('Welcome to the home page');
});

// Check Auth Status
router.get('/status', checkAuthStatus);

// Get the current authenticated user's
router.get('/currentUser', loggedIn, getCurrentUser);

// Get a specific user's profile by their username
router.get('/profile/:username', loggedIn, getUserProfile);

// Logout
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed', error: err });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
});



// Update user profile
router.put('/profile/:username', async (req, res) => {
    const { username } = req.params;
    const updates = req.body; // Get all the fields from the request body

    try {
        const result = await updateUserProfile(username, updates);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});


export default router;
