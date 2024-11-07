import React from "react";
import { useState } from "react";
import TextInput from "./FormTextInput";
import FileInput from "./FormFileInput";
import InterestButton from "./InterestButton";

function SignUpForm() {
  const [formData, setFormData] = useState({
    pseudo: "",
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    confirmerMotDePasse: "",
    avatar: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <form style={{ width: "80%" }}>
        {/* Pseudo and Avatar on the same line */}
        <div className="row mb-3">
          <div className="col-md-6">
            <TextInput
              label="Pseudo"
              name="pseudo"
              value={formData.pseudo}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <FileInput label="Avatar" name="avatar" onChange={handleChange} />
          </div>
        </div>
        {/* Nom and Prénom on the same line */}
        <div className="row mb-3">
          <div className="col-md-6">
            <TextInput
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <TextInput
              label="Prénom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Email field taking full width */}
        <div className="row mb-3">
          <div className="col-md-12">
            <TextInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Mot de passe field taking full width */}
        <div className="row mb-3">
          <div className="col-md-12">
            <TextInput
              label="Mot de passe"
              name="motDePasse"
              type="password"
              value={formData.motDePasse}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Confirmer votre mot de passe */}
        <TextInput
          label="Confirmer votre mot de passe"
          name="confirmerMotDePasse"
          type="password"
          value={formData.confirmerMotDePasse}
          onChange={handleChange}
        />
        {/* Centre d'intérêt Label */}
        <div className="row mb-5 mt-5">
          <div className="col-md-12">
            <label htmlFor="interests" className="form-label mb-4">
              Centres d’intérêt :
            </label>
            <div
              id="interests"
              className="d-flex flex-wrap justify-content-between categories"
            >
              <InterestButton />
            </div>
          </div>
        </div>

        {/* Conditions générales Checkbox */}
        <div className="form-check mb-5 mt-5">
          <input
            type="checkbox"
            className="form-check-input"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="agreeToTerms">
            J'accepte les conditions générales
          </label>
        </div>

        {/* Submit Button */}
        <button
          variant="primary"
          type="submit"
          className="btn bg-primary w-100 border-0"
          disabled={!formData.agreeToTerms} // Disables submit unless checkbox is checked
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
