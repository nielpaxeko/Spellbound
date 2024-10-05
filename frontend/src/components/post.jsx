import React from "react";
import { Card, Image, Button, Dropdown, NavLink } from "react-bootstrap";
import PropTypes from "prop-types";

const hasUserLikedPost = async (postId, userId) => {
    const likesRef = collection(db, "postLikes");
    const likeQuery = query(likesRef, where("postID", "==", postId), where("userID", "==", userId));
    const likeDoc = await getDocs(likeQuery);
    return !likeDoc.empty;
};

const handleLikeToggle = async (postId, userId) => {
    const likesRef = collection(db, "postLikes");
    // Check if the user has already liked the post
    const hasLiked = await hasUserLikedPost(postId, userId);
    if (hasLiked) { // Remove the like

        const likeQuery = query(likesRef, where("postID", "==", postId), where("userID", "==", userId));
        const likeDoc = await getDocs(likeQuery);
        if (!likeDoc.empty) {
            await deleteDoc(likeDoc.docs[0].ref);
        }
    } else {
        await addDoc(likesRef, { postID: postId, userID: userId });
    }
};
const countLikesForPost = async (postId) => {
    const likesRef = collection(db, "postLikes");
    const likeQuery = query(likesRef, where("postID", "==", postId));
    const likeDocs = await getDocs(likeQuery);
    return likeDocs.size;
};




const Post = ({ post, user }) => {
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
                    <Button className="social-btn rounded-5" handleLikeToggle>
                        <div className="post-like">
                            <i className="bi bi-hand-thumbs-up post-icon"></i>
                            <span className="post-action">Like</span>
                        </div>
                    </Button>
                    <Button className="social-btn rounded-5">
                        <i className="bi bi-chat-dots post-icon"></i>
                        <span className="post-action">Comment</span>
                    </Button>
                    <Button className="social-btn rounded-5">
                        <i className="bi bi-send post-icon"></i>
                        <span className="post-action">Share</span>
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
        createdAt: PropTypes.object.isRequired,
        mediaUrl: PropTypes.string,
        mediaType: PropTypes.string,
        privacy: PropTypes.string,
    }).isRequired,
    user: PropTypes.shape({
        profilePicture: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired,
};

export default Post;
