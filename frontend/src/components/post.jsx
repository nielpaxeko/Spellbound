import React from "react";
import { Card, Image, Button, Dropdown, NavLink } from "react-bootstrap";
import PropTypes from "prop-types";
import likeIcon from "../assets/like.svg";
import dislikeIcon from "../assets/dislike.svg";
import commentIcon from "../assets/comment.svg";
import shareIcon from "../assets/share.svg";

const Post = ({ post, user }) => {
    return (
        <Card className="post-card">
            <Card.Header className="post-header">
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center">
                        <Image src={user.profilePicture} roundedCircle style={{ width: "40px", height: "40px" }} />
                        <div className="ms-2">
                            <NavLink href="#" className="text-decoration-none text-dark fw-bold">{user.username}</NavLink>
                            <div className="text-muted small">{post.createdAt.toDate().toLocaleString()}</div>
                        </div>
                    </div>
                    <div className="ms-auto">
                        <Dropdown>
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
                <Card.Text>{post.content}</Card.Text>
                {post.mediaUrl && (
                    <div className="ratio ratio-16x9">
                        {post.mediaType === "image" ? (
                            <Image src={post.mediaUrl} alt="Post media" fluid />
                        ) : (
                            <video src={post.mediaUrl} controls />
                        )}
                    </div>
                )}
            </Card.Body>
            <Card.Footer className="post-footer">
                <div className="post-footer-options">
                    <Button className="social-btn rounded-5">
                        <i className="bi bi-hand-thumbs-up post-icon"></i> Like <i className="bi bi-hand-thumbs-down post-icon"></i>
                    </Button>
                    <Button className="social-btn rounded-5">
                        <i className="bi bi-chat-dots post-icon"></i> Comment
                    </Button>
                    <Button className="social-btn rounded-5">
                        <i className="bi bi-send post-icon"></i> Share
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
    }).isRequired,
    user: PropTypes.shape({
        profilePicture: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired,
};

export default Post;