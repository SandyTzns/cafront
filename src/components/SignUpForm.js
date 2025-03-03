import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import categories from "../data/categories.json";
import simpleCategories from "../data/categories_simple.json";
import { registerUser } from "../services/userService";
import "../styles/SignUpForm.css";

function SignUpForm() {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState({});
  const useSimpleCategories = true; // Toggle to switch between datasets
  const categoriesData = useSimpleCategories ? simpleCategories : categories;
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: "",
    website: "",
    logo: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      pseudo: document.getElementById("pseudo").value,
      lastName: document.getElementById("lastName").value,
      firstName: document.getElementById("firstName").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      avatar: document.getElementById("avatar").files[0] || null,
      interests:
        Object.keys(selectedInterests).length > 0 ? selectedInterests : null,
    };

    try {
      const response = await registerUser(userData);

      if (response.success) {
        alert("Inscription réussie !");
        navigate("/accueil");
      } else {
        alert(response.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // const toggleInterest = (category, interest) => {
  //   setSelectedInterests((prev) => {
  //     const categoryInterests = prev[category] || [];
  //     if (categoryInterests.includes(interest)) {
  //       return {
  //         ...prev,
  //         [category]: categoryInterests.filter((item) => item !== interest),
  //       };
  //     } else {
  //       return {
  //         ...prev,
  //         [category]: [...categoryInterests, interest],
  //       };
  //     }
  //   });
  // };

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) => {
      const updatedInterests = { ...prev };
      if (updatedInterests[interest]) {
        delete updatedInterests[interest]; // Remove if already selected
      } else {
        updatedInterests[interest] = true; // Add if not selected
      }
      return updatedInterests;
    });
  };

  const handleAddCompany = () => {
    setCompanies([...companies, newCompany]);
    setNewCompany({ name: "", website: "", logo: null }); // Reset form
    setShowForm(false);
  };

  const handleDeleteCompany = (index) => {
    const updatedCompanies = companies.filter((_, i) => i !== index);
    setCompanies(updatedCompanies);
  };

  return (
    <div className="sign-up-page">
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <div className="input-pair">
            <label htmlFor="pseudo">Pseudo</label>
            <input type="text" id="pseudo" placeholder="Votre pseudo" />
          </div>
          <div className="input-pair avatar-input">
            <label htmlFor="avatar">Avatar</label>
            <input type="file" id="avatar" />
          </div>
        </div>
        <div className="form-group row fullname-section">
          <div className="input-pair">
            <label htmlFor="lastName">Nom</label>
            <input type="text" id="lastName" placeholder="Votre nom" required />
          </div>
          <div className="input-pair">
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              id="firstName"
              placeholder="Votre prénom"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Votre email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            placeholder="Votre mot de passe"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmer votre mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirmer votre mot de passe"
            required
          />
        </div>
        <div className="interests-section">
          <h3 className="interests-title">Centres d’intérêts</h3>
          <div className="interests-grid">
            {categoriesData.map((category) => (
              <div
                key={category.name}
                className={`interest-item ${
                  selectedInterests[category.name] ? "selected" : ""
                }`}
                onClick={() => toggleInterest(category.name)}
                style={{
                  "--hover-color": category.color,
                  "--selected-color": category.color,
                }}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
        {/* Publicité Section */}
        <div className="publicite-section">
          <h3 className="publicite-title">Publicité</h3>
          <p className="publicite-description">
            <em>
              Ajoutez les informations de votre entreprise, et un lien vers
              votre site sera mis en avant dans la section Publicité de Coeur
              Alizés.
            </em>
          </p>

          {/* Add Company Button */}
          <button
            className="add-company-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Fermer le formulaire" : "+ Ajouter une entreprise"}
          </button>

          {/* Form Appears When Clicking the Button */}
          {showForm && (
            <div className="company-form">
              <input
                type="text"
                placeholder="Nom de l’entreprise"
                value={newCompany.name}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, name: e.target.value })
                }
              />
              <input
                type="url"
                placeholder="Lien du site web"
                value={newCompany.website}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, website: e.target.value })
                }
              />
              <input
                type="file"
                onChange={(e) =>
                  setNewCompany({ ...newCompany, logo: e.target.files[0] })
                }
              />
              <button onClick={handleAddCompany}>Ajouter</button>
            </div>
          )}

          {/* List of Added Companies */}
          {companies.length > 0 && (
            <ul className="company-list">
              {companies.map((company, index) => (
                <li key={index} className="company-item">
                  <span>
                    {company.name} -{" "}
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Voir le site
                    </a>
                  </span>
                  <button
                    className="delete-company-btn"
                    onClick={() => handleDeleteCompany(index)}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="signupform-btn">
          Créer un compte
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
