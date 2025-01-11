import React from "react";

function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="npf-modal-overlay" onClick={onClose}>
      <div
        className="npf-modal-container"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
      >
        <div className="npf-modal-header">
          <p>Créer une publication</p>
          <button className="npf-modal-close" onClick={onClose}>
            ✖
          </button>
        </div>
        <div className="npf-modal-content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
