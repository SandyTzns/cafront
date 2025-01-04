import React from "react";
import "../styles/SharedContent.css";

function ArticlePost() {
  return (
    <div className="shared-content">
      <h4 className="tag tag-blue">Science</h4>
      <h3>Latest Rocket Launch</h3>
      <a
        href="https://www.space.com/latest-rocket-launch"
        target="_blank"
        rel="noopener noreferrer"
        className="content-link"
      >
        Read the article
      </a>
    </div>
  );
}

export default ArticlePost;
