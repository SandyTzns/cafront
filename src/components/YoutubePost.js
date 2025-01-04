import React from "react";
import "../styles/SharedContent.css";

function YoutubePost() {
  return (
    <div className="shared-content">
      <h4 className="tag tag-red">Music</h4>
      <h3>ITZY's Latest Music Video</h3>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/sample-id"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default YoutubePost;
