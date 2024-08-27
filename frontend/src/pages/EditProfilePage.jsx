import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/profile.css';

function EditProfilePage() {
    const [user, setUser] = useState({
        profile_picture: '',
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        role: 'student',
        bio: '',
        school: '',
        house: '',
        major: '',
    });

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState('student');
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

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setError('');

        const userConfirmation = window.prompt('Please enter your current password to confirm changes:');
        if (userConfirmation === null) return; // User cancelled

        try {
            const response = await axios.put('/api/auth/profile/' + user.username, {
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                password: newPassword,
                role: user.role,
                currentPassword: userConfirmation
            }, { withCredentials: true });

            setMessage(response.data.message);
            console.log('Profile updated successfully:', response.data);
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
            <Form className='mt-4' onSubmit={handleSubmit}>
                <Form.Group className="edit-form">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="first_name"
                        value={user.first_name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="edit-form">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="last_name"
                        value={user.last_name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="edit-form">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="edit-form">
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

                <Form.Group className="edit-form">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="bio"
                        value={user.bio || ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="edit-form">
                    <Form.Label>Major</Form.Label>
                    <Form.Control
                        type="text"
                        name="major"
                        value={user.major || ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="edit-form">
                    <Form.Label>School</Form.Label>
                    <Form.Control
                        type="text"
                        name="school"
                        value={user.school || ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="edit-form">
                    <Form.Label>House</Form.Label>
                    <Form.Control
                        type="text"
                        name="house"
                        value={user.house || ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="edit-form" controlId="formRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="student">Student</option>
                        <option value="professor">Professor</option>
                        <option value="administrator">Administrator</option>
                    </Form.Control>
                </Form.Group>



                <Button type="submit">
                    Save Changes
                </Button>
            </Form>
        </Container>
    );
}

export default EditProfilePage;
