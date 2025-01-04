import React from "react";
import "../styles/SharedContent.css";

function InstagramPost() {
  return (
    <div className="shared-content">
      <h4 className="tag tag-purple">Social</h4>
      <h3>Instagram Video</h3>
      <iframe
        src="https://www.instagram.com/p/sample-id/embed"
        width="400"
        height="480"
        allowFullScreen
        frameBorder="0"
      ></iframe>
    </div>
  );
}

export default InstagramPost;
