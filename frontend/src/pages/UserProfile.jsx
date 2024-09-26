import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from "../../../backend/contexts/authContext/index.jsx"; // Firebase auth context
import { doc, getDoc } from 'firebase/firestore'; // Firestore imports
import { db } from "../../../backend/firebase/firebase.js"; // Your Firebase configuration
import defaultProfilePicture from "../assets/default-profile-picture.jpeg";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/profile.css';

function UserProfile() {
    const { uid } = useParams(); // Capture UID from the URL
    const [user, setUser] = useState(null); // Store user data
    const [error, setError] = useState(null); // Handle errors if any
    const { currentUser } = useAuth(); // Get the current authenticated user
    const navigate = useNavigate();

    const profilePicture = user?.profile_picture
        ? `data:image/jpeg;base64,${user.profile_picture}`
        : defaultProfilePicture;

    useEffect(() => {
        const fetchUserData = async () => {
            if (!uid) {
                // If there's no UID in the URL, return or set an error
                setError("No user ID provided.");
                return;
            }

            try {
                // Fetch the user data from Firestore using the uid from the URL
                const userDocRef = doc(db, "users", uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    // Set the user data including the uid from Firestore
                    setUser({ uid, ...userDoc.data() });
                } else {
                    setError("User profile not found.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Error fetching user data.");
            }
        };

        fetchUserData();
    }, [uid]);

    // Handle when the current user's profile is being viewed
    const isCurrentUser = currentUser && currentUser.uid === uid;

    // Navigate user to the edit profile page
    const handleEditProfile = () => {
        navigate(`/profile/${uid}/edit`); // Navigate to edit profile page based on uid
    };

    // If there's an error or user data is not yet loaded, display a message
    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!user) {
        return <div>Loading profile...</div>;
    }

    return (
        <div className='profile-wrapper row'>
            <div className='col-3 col-sm-6'>
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
                        <Card.Text>Name: {user.firstName} {user.lastName}</Card.Text>
                        <Card.Text>Email: {user.email}</Card.Text>
                        {user.country_of_origin && <Card.Text>Country: {user.country_of_origin}</Card.Text>}
                    </Card.Body>
                    <Card.Footer className='profile-footer'>
                        <div className='profile-btns'>
                            {/* Show follow and message buttons for other users' profiles */}
                            {!isCurrentUser && (
                                <div className='profile-btns'>
                                    <Button className='btn btn-pink'>Follow</Button>
                                    <Button className='btn btn-pink'>Message</Button>
                                </div>
                            )}
                            {/* Show edit button for the current user's profile */}
                            {isCurrentUser && (
                                <div className='profile-btns'>
                                    <Button className='btn-pink' onClick={handleEditProfile}>Edit Profile</Button>
                                </div>
                            )}
                        </div>
                    </Card.Footer>
                </Card>
            </div>
            <div className='col-9 col-sm-6'>
                {/* This is where you can display user posts or additional info */}
                <div>
                    {/* Content goes here */}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
