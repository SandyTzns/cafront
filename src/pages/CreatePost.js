import React from "react";
import Navbar from "../components/Navbar";
import "../styles/CreatePost.css";

function CreatePost() {
  return (
    <div>
      <Navbar />
      <div className="create-post-container">
        <main>
          <h2>Diffusez votre coup de coeur</h2>
          <form className="create-post-form">
            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="category">Catégorie</label>
                <select id="category" name="category" required>
                  <option value="">Choisir la catégorie</option>
                  {/* Add categories here */}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="subcategory">Sous-catégorie</label>
                <select id="subcategory" name="subcategory" required>
                  <option value="">Choisir la sous-catégorie</option>
                  {/* Add subcategories here */}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Titre"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="link">Lien</label>
              <input type="url" id="link" name="link" placeholder="Lien" />
            </div>
            <div className="form-group">
              <label htmlFor="media">Media</label>
              <input type="file" id="media" name="media" />
            </div>
            <button type="submit" className="submit-btn">
              ENVOYER
            </button>
          </form>
        </main>
      </div>
      <footer className="create-post-footer">
        <p>Coeur Alizés Spirit 2024</p>
      </footer>
    </div>
  );
}

export default CreatePost;
