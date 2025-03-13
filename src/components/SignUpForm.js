import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import categories from "../data/categories.json";
import simpleCategories from "../data/categories.json";
import { registerUser } from "../services/userService";
import "../styles/SignUpForm.css";

function SignUpForm() {
  // const navigate = useNavigate();
  const [pseudo, setPseudo] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    // Use the first company if available for advertisement info
    const company =
      companies.length > 0
        ? companies[0]
        : { name: "", website: "", logo: null };

    // Create a userData object including all fields
    const userData = {
      pseudo,
      lastName,
      firstName,
      email,
      password,
      avatar,
      interests: selectedInterests,
      company_name: company.name,
      company_url: company.website,
      company_logo: company.logo,
    };

    try {
      const response = await registerUser(userData);
      if (response.success) {
        alert("Inscription réussie !");
        // Reset form fields
        setPseudo("");
        setLastName("");
        setFirstName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAvatar(null);
        setSelectedInterests({});
        setCompanies([]);
        setNewCompany({ name: "", website: "", logo: null });

        // Optionally, reset file input
        document.getElementById("avatar").value = "";
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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

  const handleAddCompany = (e) => {
    e.preventDefault();
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
            <input
              type="text"
              id="pseudo"
              placeholder="Votre pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
          </div>
          <div className="input-pair avatar-input">
            <label htmlFor="avatar">Avatar</label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>
        </div>
        <div className="form-group row fullname-section">
          <div className="input-pair">
            <label htmlFor="lastName">Nom</label>
            <input
              type="text"
              id="lastName"
              placeholder="Votre nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="input-pair">
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              id="firstName"
              placeholder="Votre prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmer votre mot de passe</label>
          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirmer votre mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "👁️" : "🙈"}
            </span>
          </div>
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
            type="button"
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
