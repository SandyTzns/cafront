import React, { useRef } from "react";
import "../styles/MediaUpload.css";

function MediaUpload({
  onFileSelect,
  acceptTypes = "image/*,video/*,audio/*",
  multiple = true,
}) {
  const fileInputRef = useRef(null);

  const handleContainerClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input's click event
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (onFileSelect) {
      onFileSelect(files); // Pass selected files to the parent component
    }
  };

  return (
    <div className="media-upload-container" onClick={handleContainerClick}>
      <input
        type="file"
        ref={fileInputRef} // Attach a ref to the hidden file input
        className="media-upload-input"
        accept={acceptTypes}
        multiple={multiple}
        onChange={handleFileChange}
      />
      <p>Drag and drop your files here, or click to upload.</p>
    </div>
  );
}

export default MediaUpload;
