import db from '../db.js';

// Function to create a new post
export const createPost = async (user_id, title, content, privacy, media_url = null) => {
    try {
        const query = `
      INSERT INTO posts (user_id, title, content, privacy, media_url) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *;
    `;
        const values = [user_id, title, content, privacy, media_url];

        // Execute the query and get the result
        const result = await db.query(query, values);

        // Return the newly created post
        return result.rows[0];
    } catch (error) {
        console.error('Error creating post:', error);
        throw new Error('Error creating post: ' + error.message);
    }
};