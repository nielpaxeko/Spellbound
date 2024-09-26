CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    bio TEXT,
	country_of_origin VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
);

CREATE TABLE countries (
    country_id SERIAL PRIMARY KEY,
    country_name VARCHAR(255) NOT NULL,
    iso_code CHAR(3) UNIQUE NOT NULL,
    flag_url VARCHAR(255),
    area_sq_km DOUBLE PRECISION
);

CREATE TABLE cities (
    city_id SERIAL PRIMARY KEY,
    city_name VARCHAR(255) NOT NULL,
    country_id INT NOT NULL REFERENCES countries(country_id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8)
);

CREATE TABLE user_visits (
    user_visit_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id),
    country_id INT REFERENCES countries(country_id),
    city_id INT REFERENCES cities(city_id)
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    privacy VARCHAR(20), 
	title VARCHAR(255) NOT NULL,
    content TEXT,
    media_url VARCHAR(255) DEFAULT NULL,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
	created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE post_comments (
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
    UNIQUE (post_id, user_id)
);
Ï
-- Examples of INSERT INTO the user tables
INSERT INTO users (first_name, last_name, username, email, password, role, major, house, school)
VALUES ('Harry', 'Potter', 'theboywholived', 'hpotter@hogwarts.edu', 'parseltongue', 'student', 'Defense Against the Dark Arts', 'Gryffindor', 'Hogwarts');
INSERT INTO users (first_name, last_name, username, email, password, role, major, house, school)
VALUES ('Hermione', 'Granger', 'hermione.granger', 'hermione.granger@hogwarts.edu', 'weaselover', 'student', 'Magical Law', 'Gryffindor', 'Hogwarts');

-- Queries
-- Query all cities in a country
SELECT city_name FROM cities
WHERE country_id = (
    SELECT country_id FROM countries WHERE country_name = 'France'
);
