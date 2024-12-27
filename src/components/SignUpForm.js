import React, { useState } from "react";
import { Collapsible } from "./Collapsible";
import categoriesData from "../data/categories.json";
import "../styles/SignUpForm.css";

function SignUpForm() {
  const [selectedInterests, setSelectedInterests] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", selectedInterests);
  };

  const toggleInterest = (category, interest) => {
    setSelectedInterests((prev) => {
      const categoryInterests = prev[category] || [];
      if (categoryInterests.includes(interest)) {
        return {
          ...prev,
          [category]: categoryInterests.filter((item) => item !== interest),
        };
      } else {
        return {
          ...prev,
          [category]: [...categoryInterests, interest],
        };
      }
    });
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
        <div className="form-group">
          <label>Centres d’intérêts</label>
          <div className="interests-section">
            {categoriesData.map((category) => (
              <Collapsible
                key={category.name}
                category={category}
                selectedInterests={selectedInterests[category.name] || []}
                onToggleInterest={toggleInterest}
              />
            ))}
          </div>
        </div>
        <button type="submit">Créer un compte</button>
      </form>
    </div>
  );
}

export default SignUpForm;
