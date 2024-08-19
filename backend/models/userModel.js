import pg from "pg";
// import bcrypt from "bcrypt";
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
