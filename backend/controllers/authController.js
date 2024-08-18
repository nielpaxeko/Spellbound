import { createUser, findUserByEmail } from "../models/userModel.js";

// Signup Controller
export const signup = async (req, res) => {
    const { firstName, lastName, username, email, password, confirmPassword } = req.body;

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
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        const user = await createUser(firstName, lastName, username, email, password);
        req.login(user, (err) => {
            if (err) {
                console.error("Login error:", err);
                return res.status(500).json({ message: 'Error during login' });
            }
            console.log("User created successfully");
            return res.status(201).json({ message: "User created successfully", user });
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};









