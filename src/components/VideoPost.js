import React from "react";
import "../styles/SharedContent.css";

function VideoPost() {
  return (
    <div className="shared-content">
      <h4 className="tag tag-yellow">Video</h4>
      <h3>Video from Computer</h3>
      <video width="560" height="315" controls>
        <source src="/assets/sample-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPost;
