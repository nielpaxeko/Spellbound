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
Ï
-- Examples of INSERT INTO the user tables
INSERT INTO users (first_name, last_name, username, email, password, role, major, house, school)
VALUES ('Harry', 'Potter', 'theboywholived', 'hpotter@hogwarts.edu', 'parseltongue', 'student', 'Defense Against the Dark Arts', 'Gryffindor', 'Hogwarts');
INSERT INTO users (first_name, last_name, username, email, password, role, major, house, school)
VALUES ('Hermione', 'Granger', 'hermione.granger', 'hermione.granger@hogwarts.edu', 'weaselover', 'student', 'Magical Law', 'Gryffindor', 'Hogwarts');