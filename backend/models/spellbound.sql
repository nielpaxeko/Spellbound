CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'professor', 'administrator')),
    major VARCHAR(100),
    house VARCHAR(50),
    school VARCHAR(100),
    profile_picture VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    media_url VARCHAR(255) DEFAULT NULL
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    parent_id INT REFERENCES comments(comment_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE post_likes (
    like_id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    liked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (post_id, user_id)  -- Ensures that a user can only like a post once
);
Ï
-- Examples of INSERT INTO the user tables
INSERT INTO users (first_name, last_name, username, email, password, role, major, house, school)
VALUES ('Harry', 'Potter', 'theboywholived', 'hpotter@hogwarts.edu', 'parseltongue', 'student', 'Defense Against the Dark Arts', 'Gryffindor', 'Hogwarts');
INSERT INTO users (first_name, last_name, username, email, password, role, major, house, school)
VALUES ('Hermione', 'Granger', 'hermione.granger', 'hermione.granger@hogwarts.edu', 'weaselover', 'student', 'Magical Law', 'Gryffindor', 'Hogwarts');