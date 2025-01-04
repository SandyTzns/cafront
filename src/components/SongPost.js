import React from "react";
import "../styles/SharedContent.css";

function SongPost() {
  return (
    <div className="shared-content">
      <h4 className="tag tag-green">Music</h4>
      <h3>Song from Computer</h3>
      <audio controls>
        <source src="/assets/sample-song.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default SongPost;
