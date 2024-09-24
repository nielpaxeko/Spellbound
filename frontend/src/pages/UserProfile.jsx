import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    const profilePicture = user.profile_picture
        ? `data:image/jpeg;base64,${user.profile_picture}`
        : defaultProfilePicture;


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

    // Navigate user to edit profile page
    const handleEditProfile = () => {
        navigate(`/profile/${currentUser}/edit`);
    };

    return (
        <div className='profile-wrapper'>
            <Card className="profile-card rounded-4">
                <Card.Header className='profile-header'>
                    <img
                        src={profilePicture}
                        alt="Profile"
                        className="profile-picture"
                    />
                    <Card.Title className='text-light'>{user.username}</Card.Title>
                    {user.bio && <Card.Text className='text-light'>{user.bio}</Card.Text>}

                </Card.Header>
                <Card.Body>
                    <Card.Text>Name: {user.first_name} {user.last_name}</Card.Text>
                    <Card.Text>Email: {user.email}</Card.Text>
                    {user.country_of_origin && <Card.Text>Country: {user.country_of_origin}</Card.Text>}
                </Card.Body>
                {/* For the footer, if viewing another user's profile then add follow and message buttons, else add edit button */}
                <Card.Footer className='profile-footer'>
                    <div className='profile-btns'>
                        {/* <Button className='btn btn-secondary'>Bio</Button>
                        <Button className='btn btn-secondary'>Trail</Button> */}
                        {!isCurrentUser && (
                            <div className='profile-btns'>
                                <Button className='btn btn-pink'>Follow</Button>
                                <Button className='btn btn-pink'>Message</Button>
                            </div>
                        )}
                        {isCurrentUser && (
                            <div className='profile-btns'>
                                <Button className='btn-pink' onClick={handleEditProfile}>Edit Profile</Button>
                            </div>

                        )}
                    </div>


                </Card.Footer>

            </Card>
        </div>
    );
}

// Define prop types for the component
UserProfile.propTypes = {
    username: PropTypes.string,
};

export default UserProfile;
