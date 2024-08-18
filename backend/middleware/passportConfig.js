
import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { findUserByEmail } from '../models/userModel.js';

passport.use(new Strategy(async function verify(email, password, cb) {
    try {
        console.log("Login request received for email:", email);

        // Find user by email
        const user = await findUserByEmail(email);
        console.log("User found:", user);

        if (!user) {
            console.log("User not found");
            return cb("User not found");
        }
        // Compare the provided password with the stored hash
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return cb(err)
            } else {
                if (result) { // If login is successful
                    return cb(null, user)
                } else {
                    console.log("Invalid password provided");
                    return cb(null, false)
                }
            }
        });
    } catch (error) {
        return cb(error)
    }
}))

passport.serializeUser((user, cb) => {
    cb(null, user.email);
});

// Deserialize user from the session
passport.deserializeUser(async (email, cb) => {
    try {
        const user = await findUserByEmail(email);
        if (user) {
            cb(null, user);
        } else {
            cb(new Error('User not found'));
        }
    } catch (error) {
        cb(error);
    }
});

