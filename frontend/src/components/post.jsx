import React, { useEffect, useState } from "react";
import { Card, Image, Button, Dropdown, NavLink } from "react-bootstrap";
import PropTypes from "prop-types";
import { db } from "../../../backend/firebase/firebase.js";
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    deleteDoc
} from "firebase/firestore";

const hasUserLikedPost = async (postId, userId) => {
    const likesRef = collection(db, "postLikes");
    const likeQuery = query(likesRef, where("postID", "==", postId), where("userID", "==", userId));
    const likeDoc = await getDocs(likeQuery);
    return !likeDoc.empty;
};

const handleLikeToggle = async (postId, userId, setHasLiked) => {
    const likesRef = collection(db, "postLikes");
    const hasLiked = await hasUserLikedPost(postId, userId);

    if (hasLiked) { // Remove the like
        const likeQuery = query(likesRef, where("postID", "==", postId), where("userID", "==", userId));
        const likeDoc = await getDocs(likeQuery);

        if (!likeDoc.empty) {
            await deleteDoc(likeDoc.docs[0].ref);
            setHasLiked(false); // Update the like state
        }
    } else {
        await addDoc(likesRef, { postID: postId, userID: userId });
        setHasLiked(true); // Update the like state
    }
};

const Post = ({ post, user }) => {
    const { content, createdAt } = post;
    const [hasLiked, setHasLiked] = useState(false);
    const postDate = createdAt instanceof Date ? createdAt : createdAt.toDate();

    useEffect(() => {
        const checkUserLikedPost = async () => {
            const liked = await hasUserLikedPost(post.id, user.userID);
            setHasLiked(liked);
        };

        checkUserLikedPost();
    }, [post.id, user.userID]);

    return (
        <Card className="post-card border border-dark rounded-2">
            <Card.Header className="post-header">
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center">
                        <Image
                            className="profile-picture"
                            src={user.profilePicture}
                            roundedCircle
                            style={{ width: "40px", height: "40px" }}
                        />
                        <div className="ms-2">
                            <NavLink href="#" className="text-decoration-none text-dark fw-bold">
                                {user.username}
                            </NavLink>
                            <div className="post-info text-muted small gap-1">
                                {post.createdAt.toDate().toLocaleString()}
                                {post?.privacy === "public" && (
                                    <i className="bi bi-globe-americas post-icon"></i>
                                )}
                                {post?.privacy === "friends" && (
                                    <i className="bi bi-people-fill post-icon"></i>
                                )}
                                {post?.privacy === "private" && (
                                    <i className="bi bi-lock-fill post-icon"></i>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="ms-auto">
                        <Dropdown className="post-dropdown">
                            <Dropdown.Toggle variant="link" className="text-muted">
                                <i className="bi bi-three-dots"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#">Edit Post</Dropdown.Item>
                                <Dropdown.Item href="#">Delete Post</Dropdown.Item>
                                <Dropdown.Item href="#">Report Post</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Text className="post-content">{post.content}</Card.Text>
                {post.mediaUrl && (
                    <div className="post-media">
                        {post.mediaType?.startsWith('image') ? (
                            <Image src={post.mediaUrl} alt="Post media" fluid />
                        ) : (
                            <video src={post.mediaUrl} controls className="w-100" />
                        )}
                    </div>
                )}
            </Card.Body>
            <Card.Footer className="post-footer">
                <div className="post-footer-options">
                    <Button
                        className={`social-btn gap-1 rounded-5 ${hasLiked ? 'liked' : ''}`}
                        onClick={() => handleLikeToggle(post.id, user.userID, setHasLiked)}
                        style={{
                            backgroundColor: hasLiked ? '#DC143C' : '', 
                        }}>
                        <span className="post-action">Like</span>
                        <i className="bi bi-hand-thumbs-up post-icon"></i>
                    </Button>
                    <Button className="social-btn gap-1 rounded-5">
                        <span className="post-action">Comment</span>
                        <i className="bi bi-chat-dots post-icon"></i>
                    </Button>
                    <Button className="social-btn gap-1 rounded-5">
                        <span className="post-action">Share</span>
                        <i className="bi bi-send post-icon"></i>
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    );
};

Post.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        userID: PropTypes.string.isRequired,
        createdAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.object]).isRequired,
        mediaUrl: PropTypes.string,
        mediaType: PropTypes.string,
        privacy: PropTypes.string,
    }).isRequired,
    user: PropTypes.shape({
        userID: PropTypes.string.isRequired,
        profilePicture: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired,
};

export default Post;
