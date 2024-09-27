import React, { useState, useEffect } from "react";
import CreatePostPrompt from "./CreatePostPrompt.jsx";
import { useAuth } from "../../../backend/contexts/authContext/index.jsx";
import { db } from "../../../backend/firebase/firebase.js";
import { doc, getDoc } from 'firebase/firestore';
import '../styles/timeline.css';

function HomePage() {
    const [user, setUser] = useState(null);
    const { currentUser } = useAuth(); 
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!currentUser) {
                setError('No user is currently logged in.');
                return;
            }

            try {
                // Fetch the user profile from Firestore using the currentUser's uid
                const userDocRef = doc(db, "users", currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setUser(userDoc.data());
                } else {
                    setError('User profile not found.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data. Please try again later.');
            }
        };

        fetchUserData();
    }, [currentUser]);

    return (
        <div className="timeline-container container-lg">
            <div className="timeline-config">
                {error && <div className="error-message">{error}</div>}
                {user && <CreatePostPrompt user={user} />}
            </div>
        </div>
    );
}

export default HomePage;
