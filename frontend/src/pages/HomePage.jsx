import React, { useState, useEffect } from "react";
import CreatePostPrompt from "./CreatePostPrompt.jsx";
import Post from "../components/post.jsx";
import { useAuth } from "../../../backend/contexts/authContext/index.jsx";
import { db } from "../../../backend/firebase/firebase.js";
import { collection, getDocs, getDoc, doc, query, orderBy } from 'firebase/firestore';
import '../styles/timeline.css';

function HomePage() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
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

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsCollectionRef = collection(db, "posts");
                const postsQuery = query(postsCollectionRef, orderBy('createdAt', 'desc'));
                const postsSnapshot = await getDocs(postsQuery);

                const postsData = postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Error fetching posts. Please try again later.');
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="timeline-container container-lg">
            <div className="timeline-config">
                {error && <div className="error-message">{error}</div>}
                {user && <CreatePostPrompt user={user} />}
               
                <div className="posts-container gap-3">
                    {posts.map((post) => (
                        <Post key={post.id} post={post} user={user} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
