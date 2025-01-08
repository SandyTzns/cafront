import React, { useState } from "react";
import "../styles/NewPostForm.css";
import Logo from "../assets/images/logo.png";
import photoIcon from "../assets/images/photo.png";
import videoIcon from "../assets/images/video.png";
import musicIcon from "../assets/images/music-store.png";
import Modal from "./Modal";
import Form1 from "./Form1";

function NewPostForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="npf-container">
      <div className="npf-input-area" onClick={openModal}>
        <img src={Logo} alt="Profile" className="npf-profile-pic" />
        <input
          type="text"
          placeholder="What's on your mind?"
          className="npf-input"
        />
      </div>
      <hr className="npf-separator" />
      <div className="npf-actions">
        <button className="npf-button" onClick={openModal}>
          <img src={photoIcon} alt="" className="npf-icon" /> Photo
        </button>
        <button className="npf-button" onClick={openModal}>
          <img src={videoIcon} alt="" className="npf-icon" /> Video
        </button>
        <button className="npf-button" onClick={openModal}>
          <img src={musicIcon} alt="" className="npf-icon" /> Musique
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Form1 />
      </Modal>
    </div>
  );
}

export default NewPostForm;
