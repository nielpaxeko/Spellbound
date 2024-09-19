import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/profile.css';

function EditProfilePage() {
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        bio: '',
        country_of_origin: '',
    });

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the current user's username
        axios.get('/api/auth/currentUser', { withCredentials: true })
            .then(response => {
                setCurrentUser(response.data.username);
                // Fetch the user's data to pre-fill the form
                return axios.get(`/api/auth/profile/${response.data.username}`, { withCredentials: true });
            })
            .then(response => setUser(response.data))
            .catch(error => {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data. Please try again later.');
            });
    }, []);

    // Handle form changes
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setError('');

        const userConfirmation = window.prompt('Please enter your current password to confirm changes:');
        if (userConfirmation === null) return;

        try {
            // Send the PUT request to update the profile
            const response = await axios.put(`/api/auth/profile/${user.username}`, {

                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: newPassword,
                bio: user.bio,
                country_of_origin: user.country_of_origin,
                currentPassword: userConfirmation,
                newUsername: user.username // Send new username if it's changed
            }, { withCredentials: true });

            setMessage(response.data.message);
            console.log('Profile updated successfully:', response.data);
            // Optionally redirect or reload page
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating profile');
            console.error('Error updating profile:', err);
        }
    };

    // Redirect to profile page if the user is not authorized
    if (!currentUser) {
        return <Alert variant="danger" className='text-center'>You are not authorized to edit this profile.</Alert>;
    }

    return (
        <Container className="edit-profile-container">
            <h2>Edit Profile For User: {user.username}</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form className='mt-4' onSubmit={handleSubmit}>
{/* 
                <Form.Group className="edit-form" controlId="formProfilePicture">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                        type="file"
                        name="profile_picture"
                        onChange={handleFileChange}
                    />
                </Form.Group> */}

                <Form.Group className="edit-form" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="first_name"
                        value={user.first_name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="edit-form" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="last_name"
                        value={user.last_name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="edit-form" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="edit-form" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="edit-form" controlId="formNewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="edit-form" controlId="formBio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="bio"
                        value={user.bio || ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="edit-form" controlId="formCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        name="country_of_origin"
                        value={user.country_of_origin || ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button type="submit">
                    Save Changes
                </Button>
            </Form>
        </Container>
    );
}

export default EditProfilePage;
