import React, { useState, useEffect } from "react";
import CreatePostPrompt from "./CreatePostPrompt.jsx";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/timeline.css';

function HomePage() {
    const { username } = useParams();
    const [user, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Fetch the current user's username
        axios.get('/api/auth/currentUser', { withCredentials: true })
            .then(response => {
                setCurrentUser(response.data.username);
                return axios.get(`/api/auth/profile/${response.data.username}`, { withCredentials: true });
            })
            .then(response => setUser(response.data))
            .catch(error => {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data. Please try again later.');
            });
    }, []);

    return (
        <div className="timeline-container container-lg">
            <div className="timeline-config">
                {user && <CreatePostPrompt user={user} />}
            </div>
        </div>
    );
}

export default HomePage;