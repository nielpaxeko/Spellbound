import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Image, Button } from 'react-bootstrap';
import defaultProfilePicture from "../assets/default-profile-picture.jpeg"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/profile.css';

function UserProfile() {
    const [user, setUser] = useState({});
    const profilePicture = user.profilePicture || defaultProfilePicture;

    useEffect(() => {
        axios.get('/api/auth/profile', { withCredentials: true })
            .then(response => setUser(response.data))
            .catch(error => console.error('Error fetching user profile:', error));
    }, []);

    return (
        <div className='profile-wrapper'>
            <Card className="profile-card rounded-4">
                <Card.Header className='profile-header'>
                    <Image src={profilePicture} roundedCircle className="profile-picture img-thumbnail" />
                    <Card.Title className='text-light'>{user.username}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text> {user.first_name} {user.last_name}</Card.Text>
                    <Card.Text>
                        <p>{user.email}</p>
                    </Card.Text>
                    <Card.Text>
                        <p>{user.bio}</p>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className='profile-footer'>
                    <Button className='btn-pink'>Edit Profile</Button>
                </Card.Footer>
            </Card>
        </div>

    );
}

export default UserProfile;