import pg from "pg";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/hashPassword.js";
import dotenv from 'dotenv';

dotenv.config();
// Create a database client instance
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect(err => {
    if (err) {
        console.error('Failed to connect to PostgreSQL:', err);
    } else {
        console.log('Connected to PostgreSQL');
    }
});

// Function to create a new user
export const createUser = async (firstName, lastName, username, email, password) => {
    const hashedPassword = await hashPassword(password);
    const query = `
        INSERT INTO users (first_name, last_name, username, email, password, role)
        VALUES ($1, $2, $3, $4, $5, 'student')
        RETURNING *;
    `;
    const values = [firstName, lastName, username, email, hashedPassword];
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
        const result = await db.query('SELECT password FROM users WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            const hashedPassword = result.rows[0].password;
            return bcrypt.compare(currentPassword, hashedPassword);
        }
        return false;
    } catch (error) {
        console.error('Error verifying password:', error);
        throw error;
    }
};

// Function to update user profile
export const updateUserProfile = async (username, updates) => {
    const { first_name, last_name, email, password, role, major, house, school, bio, currentPassword } = updates;

    try {
        // Verify current password
        if (!(await verifyPassword(username, currentPassword))) {
            return { success: false, message: 'Current password is incorrect' };
        }

        // Prepare the update query
        const updateFields = [];
        const values = [];
        let index = 1;

        if (first_name) {
            updateFields.push(`first_name = $${index++}`);
            values.push(first_name);
        }
        if (last_name) {
            updateFields.push(`last_name = $${index++}`);
            values.push(last_name);
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
        if (role) {
            updateFields.push(`role = $${index++}`);
            values.push(role);
        }
        if (major) {
            updateFields.push(`major = $${index++}`);
            values.push(major);
        }
        if (house) {
            updateFields.push(`house = $${index++}`);
            values.push(house);
        }
        if (school) {
            updateFields.push(`school = $${index++}`);
            values.push(school);
        }
        if (bio) {
            updateFields.push(`bio = $${index++}`);
            values.push(bio);
        }

        // Ensure the username is the last param
        values.push(username);

        // Execute the query
        if (updateFields.length > 0) {
            const query = `UPDATE users SET ${updateFields.join(', ')} WHERE username = $${index}`;
            await db.query(query, values);
            console.log('Profile updated successfully for user:', username);
            return { success: true, message: 'Profile updated successfully' };
        } else {
            return { success: false, message: 'No fields to update' };
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        throw new Error('Error updating profile');
    }
};