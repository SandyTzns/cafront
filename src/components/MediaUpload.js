import React, { useState, useRef } from "react";
import "../styles/MediaUpload.css";

function MediaUpload({
  onFileSelect,
  acceptTypes = "image/*,video/*,audio/*",
  multiple = true,
}) {
  const fileInputRef = useRef(null);
  const [previewFiles, setPreviewFiles] = useState([]); // For file previews
  const [isDragging, setIsDragging] = useState(false);

  // Handle container click to open file input
  const handleContainerClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection via input
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  // Handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave event
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle file drop event
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  // Resize image files
  const resizeImage = (file, maxWidth, maxHeight, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > height && width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        } else if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, { type: file.type });
          callback(resizedFile);
        }, file.type);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Process selected files and generate previews
  const handleFiles = (files) => {
    const resizedFiles = [];
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        resizeImage(file, 800, 600, (resizedFile) => {
          resizedFiles.push(resizedFile);
          setPreviewFiles((prev) => [
            ...prev,
            URL.createObjectURL(resizedFile),
          ]);
          if (onFileSelect) onFileSelect(resizedFiles);
        });
      } else {
        setPreviewFiles((prev) => [...prev, URL.createObjectURL(file)]);
        if (onFileSelect) onFileSelect(files);
      }
    });
  };

  return (
    <div
      className={`media-upload-container ${isDragging ? "dragging" : ""}`}
      onClick={handleContainerClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="media-upload-input"
        accept={acceptTypes}
        multiple={multiple}
        onChange={handleFileChange}
      />
      <p>
        {isDragging
          ? "Drop the files here ..."
          : "Drag and drop your files here, or click to upload."}
      </p>
      {previewFiles.length > 0 && (
        <div className="media-preview">
          {previewFiles.map((url, index) => (
            <div key={index} className="media-preview-item">
              {url.includes("video") ? (
                <video controls>
                  <source src={url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={url} alt={`Preview ${index + 1}`} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MediaUpload;
