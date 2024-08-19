import express from "express";
import { signup } from "../controllers/authController.js";
import passport from "passport";
import session from "express-session";


const router = express.Router();

const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

// Signup Route
router.post("/signup", signup);

// Login Route
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



router.get("/home", authenticate, (req, res) => {
    res.send('Welcome to the home page');
});



export default router;
