import React, { useState, useEffect } from "react";
import { Button, Image, Dropdown, Form } from "react-bootstrap";
import { collection, query, where, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../backend/firebase/firebase.js";

const Comment = ({ comment, user, onReply }) => {
    const [replies, setReplies] = useState([]);
    const [showReplyInput, setShowReplyInput] = useState(false);

    useEffect(() => {
        const fetchReplies = async () => {
            const repliesQuery = query(
                collection(db, "postComments"),
                where("parentID", "==", comment.id)
            );
            const repliesSnapshot = await getDocs(repliesQuery);
            setReplies(repliesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchReplies();
    }, [comment.id]);

    const handleDeleteComment = async () => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            await deleteDoc(doc(db, "postComments", comment.id));
        }
    };

    return (
        <div className="comment">
            <div className="d-flex align-items-start justify-content-between">
                <Image src={comment.authorProfilePicture || "/default-profile-picture.jpeg"} roundedCircle style={{ width: "35px", height: "35px" }} />
                <div className="comment-content ms-2">
                    <strong>{comment.authorUsername}</strong>
                    <p className="small text-muted">{comment.content}</p>
                </div>
                {user.userID === comment.userID && (
                    <Dropdown>
                        <Dropdown.Toggle variant="link" className="text-muted">
                            <i className="bi bi-three-dots"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setShowReplyInput(!showReplyInput)}>
                                <i className="bi bi-reply"></i> Reply
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleDeleteComment}>
                                <i className="bi bi-trash3-fill text-danger"></i> Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </div>

            {replies.map(reply => (
                <Comment key={reply.id} comment={reply} user={user} onReply={onReply} />
            ))}

            {showReplyInput && (
                <Form
                    onSubmit={e => {
                        e.preventDefault();
                        onReply(e.target.replyText.value, comment.id);
                        setShowReplyInput(false);
                    }}
                >
                    <Form.Group>
                        <Form.Control name="replyText" placeholder="Write a reply..." />
                    </Form.Group>
                </Form>
            )}
        </div>
    );
};

// PropTypes validation
Comment.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        authorUsername: PropTypes.string.isRequired,
        authorProfilePicture: PropTypes.string,
        userID: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
        userID: PropTypes.string.isRequired,
        profilePicture: PropTypes.string,
        username: PropTypes.string,
    }).isRequired,
    onReply: PropTypes.func.isRequired,
};

export default Comment;
