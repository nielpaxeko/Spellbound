import React from "react";
import CreatePostPrompt from "./CreatePostPrompt.jsx";
import '../styles/timeline.css';

function HomePage() {
    return (
        <div className="timeline-container container-lg">
            <div className="timeline-config">
                <CreatePostPrompt />
            </div>
        </div>
    );
}

export default HomePage;
