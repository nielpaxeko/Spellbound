
import { Button } from "react-bootstrap";
import defaultProfilePicture from "../assets/default-profile-picture.jpeg";
import '../styles/timeline.css';
import axios from 'axios';
import CreatePostModal from '../modals/CreatePostModal.jsx';
import React, { useState, useEffect} from "react";
import { useParams } from 'react-router-dom';

function CreatePostPrompt() {
    const { username } = useParams();
    const [user, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);

    // Load user data
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

    const profilePicture = user?.profile_picture || defaultProfilePicture;

    return (
        <div className="create-post-prompt shadow-sm border rounded-5 p-3 bg-white shadow box-area">
            <div className="prompt-info">
                <a className="user-link" href={`/profile/${user}`} style={{ textDecoration: "none" }}>
                    {user.profile_picture ? (
                        <img src={imageUrl} alt="Profile pic" className="profile-picture" width={50} height={50} />
                    ) : (
                        <img src={defaultProfilePicture} alt="Default profile pic" className="profile-picture" width={50} height={50} />
                    )}
                </a>

                <p className="username">
                    What&apos;s on your mind{" "} {username}?
                </p>
            </div>

            <Button className="rounded-5" onClick={() => setShowCreatePostModal(true)}>
                Create Post
            </Button>

            {/* Render CreatePostModal and pass props */}
            <CreatePostModal
                show={showCreatePostModal}
                onHide={() => setShowCreatePostModal(false)}
                user={user}
            />
        </div>

    )
}

export default CreatePostPrompt