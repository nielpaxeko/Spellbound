import express from "express";
import { signup } from "../controllers/authController.js";
import passport from "passport";


const router = express.Router();

// Signup Route
router.post("/signup", signup);

// Login Route
router.post("/login", passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
}));


router.get("/home", (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Welcome to the home page');
    } else {
        res.redirect("/");
    }
});


export default router;
