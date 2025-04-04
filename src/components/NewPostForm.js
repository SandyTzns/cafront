import React, { useState } from "react";
import "../styles/NewPostForm.css";
import photoIcon from "../assets/images/photo.png";
import videoIcon from "../assets/images/video.png";
import musicIcon from "../assets/images/music-store.png";
import Modal from "./Modal";
import Form1 from "./Form1";
import Form2 from "./Form2"; // Importing Form2

function NewPostForm({ onPostSubmit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialView, setInitialView] = useState("text");
  const [activeForm, setActiveForm] = useState("Form1"); // Track active form

  const useSimpleCategories = true; // Toggle to switch category data source

  const openModal = (view, form) => {
    setInitialView(view);
    setActiveForm(form); // Set active form to Form1 or Form2
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="npf-container">
      <div
        className="npf-input-area"
        onClick={() => openModal("text", "Form1")}
      >
        <input
          type="text"
          placeholder="Que veux-tu partager ?"
          className="npf-input"
        />
      </div>
      <hr className="npf-separator" />
      <div className="npf-actions">
        <button
          className="npf-button"
          onClick={() => openModal("media", "Form2")}
        >
          <img src={photoIcon} alt="" className="npf-icon" /> Photo
        </button>
        <button
          className="npf-button"
          onClick={() => openModal("media", "Form2")}
        >
          <img src={videoIcon} alt="" className="npf-icon" /> Video
        </button>
        <button
          className="npf-button"
          onClick={() => openModal("media", "Form2")}
        >
          <img src={musicIcon} alt="" className="npf-icon" /> Musique
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {activeForm === "Form1" && (
          <Form1
            initialView={initialView}
            onSubmit={onPostSubmit}
            closeModal={closeModal}
            useSimpleCategories={useSimpleCategories} // Pass the flag to Form1
          />
        )}
        {activeForm === "Form2" && (
          <Form2
            initialView={initialView}
            onSubmit={onPostSubmit}
            closeModal={closeModal}
            useSimpleCategories={useSimpleCategories} // Pass the flag to Form2
          />
        )}
      </Modal>
    </div>
  );
}

export default NewPostForm;
