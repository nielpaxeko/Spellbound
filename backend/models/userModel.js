import bcrypt from "bcrypt";
import { hashPassword } from "../utils/hashPassword.js";
import db from '../db.js';

// Function to create a new user
export const createUser = async (firstName, lastName, username, email, password, country_of_origin) => {
    const hashedPassword = await hashPassword(password);
    const query = `
        INSERT INTO users (first_name, last_name, username, email, password, country_of_origin)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const values = [firstName, lastName, username, email, hashedPassword, country_of_origin];
    const result = await db.query(query, values);
    return result.rows[0]; // Return the new user
};

// Function to find a user by email
export const findUserByEmail = async (email) => {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};

// Function to find a user by email
export const findUserById = async (userId) => {
    const result = await db.query("SELECT * FROM users WHERE user_id = $1", [userId]);
    return result.rows[0];
};
// Function to find a user by username
export const findUserByUsername = async (username) => {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    return result.rows[0];
};

// Function to verify password
export const verifyPassword = async (username, currentPassword) => {
    try {
        // Query to get the hashed password for the given username
        const result = await db.query('SELECT password FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            console.warn(`User with username "${username}" not found`);
            return false;
        }
        const hashedPassword = result.rows[0].password;
        const isMatch = await bcrypt.compare(currentPassword, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error verifying password:', error);
        throw error;
    }
};

// Function to update user profile
export const updateUserProfile = async (username, updates) => {
    const { first_name, last_name, newUsername, email, password, bio, country_of_origin, currentPassword, profile_picture } = updates;

    try {
        // Verify current password
        if (!(await verifyPassword(username, currentPassword))) {
            return { success: false, message: 'Current password is incorrect' };
        }

        const updateFields = [];
        const values = [];
        let index = 1;

        // Add fields to update 
        if (first_name) {
            updateFields.push(`first_name = $${index++}`);
            values.push(first_name);
        }
        if (last_name) {
            updateFields.push(`last_name = $${index++}`);
            values.push(last_name);
        }
        if (newUsername) {
            const existingUser = await findUserByUsername(newUsername);
            if (existingUser && existingUser.username !== username) {
                return { success: false, message: 'Username is already taken' };
            } else {
                updateFields.push(`username = $${index++}`);
                values.push(newUsername);
            }
        }
        if (email) {
            updateFields.push(`email = $${index++}`);
            values.push(email);
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.push(`password = $${index++}`);
            values.push(hashedPassword);
        }
        if (bio) {
            updateFields.push(`bio = $${index++}`);
            values.push(bio);
        }
        if (country_of_origin) {
            updateFields.push(`country_of_origin = $${index++}`);
            values.push(country_of_origin);
        }
        if (profile_picture) {
            updateFields.push(`profile_picture = $${index++}`);
            values.push(profile_picture);  // Store binary data in the database
        }

        // If no fields to update
        if (updateFields.length === 0) {
            return { success: false, message: 'No fields to update' };
        }

        values.push(username);  // Add username as the final WHERE clause value

        const query = `UPDATE users SET ${updateFields.join(', ')} WHERE username = $${index}`;
        await db.query(query, values);

        return { success: true, message: 'Profile updated successfully' };

    } catch (error) {
        console.error('Error updating profile:', error);
        throw new Error('Error updating profile');
    }
};


