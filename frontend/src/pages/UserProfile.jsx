import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card, Image, Button } from 'react-bootstrap';
import defaultProfilePicture from "../assets/default-profile-picture.jpeg";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/profile.css';

function UserProfile() {
    const { username } = useParams();
    const [user, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const profilePicture = user.profile_picture || defaultProfilePicture;

    useEffect(() => {
        // Fetch the current user's username
        axios.get('/api/auth/currentUser', { withCredentials: true })
            .then(response => setCurrentUser(response.data.username))
            .catch(error => console.error('Error fetching current user:', error));
        // Fetch the user's data
        if (username) {
            axios.get(`/api/auth/profile/${username}`, { withCredentials: true })
                .then(response => setUser(response.data))
                .catch(error => console.error('Error fetching user profile:', error));
        }

    }, [username]);
    // Compare user to current user
    const isCurrentUser = user.username === currentUser;

    return (
        <div className='profile-wrapper'>
            <Card className="profile-card rounded-4">
                <Card.Header className='profile-header'>
                    <Image src={profilePicture} roundedCircle className="profile-picture img-thumbnail" />
                    <Card.Title className='text-light'>{user.username}</Card.Title>
                    {user.bio && <Card.Text>Bio: {user.bio}</Card.Text>}
                    {!isCurrentUser && (
                        // Only show follow and message buttons if viewing another user's profile
                        <div className='profile-btns'>
                            <Button className='btn btn-pink'>Follow</Button>
                            <Button className='btn btn-kiss'>Message</Button>
                        </div>
                    )}
                </Card.Header>
                <Card.Body>
                    <Card.Text>Name: {user.first_name} {user.last_name}</Card.Text>
                    <Card.Text>Email: {user.email}</Card.Text>
                    <Card.Text>Role: {user.role}</Card.Text>
                    {user.major && <Card.Text>Major: {user.major}</Card.Text>}
                    {user.school && <Card.Text>School: {user.school}</Card.Text>}
                    {user.house && <Card.Text>House: {user.house}</Card.Text>}
                </Card.Body>
                {isCurrentUser && (  // Only show edit button if viewing own profile
                    <Card.Footer className='profile-footer'>
                        <Button className='btn-pink'>Edit Profile</Button>
                    </Card.Footer>
                )}
            </Card>
        </div>
    );
}

// Define prop types for the component
UserProfile.propTypes = {
    username: PropTypes.string,
};

export default UserProfile;