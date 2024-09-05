import { Button, Dropdown, Modal, Form } from "react-bootstrap";
import React, { useState } from "react";
import '../styles/timeline.css';

const CreatePostModal = ({ show, onHide, user }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [privacy, setPrivacy] = useState('public');
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaType, setMediaType] = useState(null);

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : null;
            if (fileType) {
                setMediaType(fileType);
                setMediaFile(file);
            } else {
                alert('Please upload a valid image or video file.');
                setMediaFile(null);
            }
        }
    };



    const handleCreatePost = async () => {
        const formData = new FormData();
        formData.append('user_id', user.user_id);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('privacy', privacy);
        if (mediaFile) {
            formData.append('media', mediaFile);
        }

        try {
            // Save the new post to db via API
            await axios.post('/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onHide(); // Close the modal after successful post creation
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} className="create-post-template">
            <Modal.Header closeButton>
                <Modal.Title className="post-modal-title">
                    <p style={{ margin: 0 }}>Create Post</p>
                    {/* Dropdown for privacy selection */}
                    <Dropdown onSelect={(e) => setPrivacy(e)} style={{ marginLeft: "10px" }}>
                        <Dropdown.Toggle variant="light" id="dropdown-basic" className='dropdown-toggle'>
                            {privacy.charAt(0).toUpperCase() + privacy.slice(1)} {/* Display selected privacy */}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="public">Public</Dropdown.Item>
                            <Dropdown.Item eventKey="private">Private</Dropdown.Item>
                            <Dropdown.Item eventKey="friends">Friends</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Post Content */}
                <Form className="post-form">

                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter post title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="What's on your mind?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="postMedia">
                        <Form.Label>Choose Image or Video</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*,video/*" // Accept both images and videos
                            onChange={handleMediaChange}
                        />
                    </Form.Group>
                    {mediaFile && (
                        <p className="text-muted">
                            {mediaType === 'image' ? 'Image selected' : 'Video selected'}
                        </p>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button id="create-post-btn" onClick={handleCreatePost}>
                    Post
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreatePostModal