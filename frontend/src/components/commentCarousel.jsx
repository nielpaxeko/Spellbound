import React, { useState, useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import { collection, query, where, orderBy, limit, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../backend/firebase/firebase.js";
import defaultProfilePicture from "../assets/default-profile-picture.jpeg";
import dayjs from "dayjs"; // For time formatting

const CommentCarousel = ({ postID }) => {
    const [comments, setComments] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [commentAuthors, setCommentAuthors] = useState({}); // Store authors by userID

    // Fetch 3 most recent comments from Firebase
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsRef = collection(db, "postComments");
                const q = query(commentsRef, where("postID", "==", postID), orderBy("createdAt", "desc"), limit(3));
                const querySnapshot = await getDocs(q);

                const fetchedComments = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setComments(fetchedComments);

                // Fetch authors for each comment
                const authorsData = {};
                for (const comment of fetchedComments) {
                    if (!commentAuthors[comment.userID]) {
                        const userDoc = await getDoc(doc(db, "users", comment.userID));
                        if (userDoc.exists()) {
                            authorsData[comment.userID] = userDoc.data();
                        }
                    }
                }
                setCommentAuthors((prevAuthors) => ({ ...prevAuthors, ...authorsData }));
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [postID]);

    // Handle next and previous navigation
    const handlePrevComment = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? comments.length - 1 : prevIndex - 1));
    };

    const handleNextComment = () => {
        setCurrentIndex((prevIndex) => (prevIndex === comments.length - 1 ? 0 : prevIndex + 1));
    };

    // Format time ago for comments
    const getTimeAgo = (date) => dayjs(date.toDate()).fromNow();

    return (
        <div className="comment-carousel m-1">
            {comments.length > 0 ? (
                <>
                    {/* Display Current Comment */}
                    <div className="comment-display p-1">
                        {comments.length > 1 && (
                            <div className="d-flex justify-content-between">
                                <Button className="comment-carousel-btn" variant="light" onClick={handlePrevComment}>
                                    <i className="bi bi-chevron-left post-icon"></i>
                                </Button>
                            </div>
                        )}
                        <div className="d-flex comment rounded-4">
                            {/* Profile Picture */}
                            <Image
                                src={commentAuthors[comments[currentIndex].userID]?.profilePicture || defaultProfilePicture}
                                roundedCircle
                                style={{ width: "40px", height: "40px", marginRight: "10px" }}
                            />
                            <div className="comment-body">
                                {/* Username and Time */}
                                <div className="d-flex align-items-center mb-1">
                                    <strong style={{ fontSize: "12px", color: "#0f0f0f" }}>
                                        {commentAuthors[comments[currentIndex].userID]?.username + " · "}
                                    </strong>
                                    <span style={{ fontSize: "12px", color: "#606060", marginLeft: "3px" }}>
                                        {getTimeAgo(comments[currentIndex].createdAt)}
                                    </span>
                                    {comments[currentIndex].updatedAt && (
                                        <span className="text-muted updatedDate"> · (Edited)</span>
                                    )}
                                </div>
                                {/* Comment Text */}
                                <p style={{ fontSize: "14px", color: "#0f0f0f", margin: 0 }}>
                                    {comments[currentIndex].content}
                                </p>
                            </div>
                        </div>
                        {comments.length > 1 && (
                            <div className="d-flex justify-content-between ">
                                <Button className="comment-carousel-btn" variant="light" onClick={handleNextComment}>
                                    <i className="bi bi-chevron-right post-icon"></i>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Navigation Arrows */}



                </>
            ) : (
                <p className="text-muted text-center m-3">No comments yet. Be the first to comment!</p>
            )}
        </div>
    );
};

// PropTypes validation
CommentCarousel.propTypes = {
    postID: PropTypes.string.isRequired,
};

export default CommentCarousel;
