import React, { useState } from "react";
import "../styles/Profile.css";
import Interests from "../components/Interests";

function Profile() {
  const [userData, setUserData] = useState({
    pseudo: "Sandy",
    firstName: "Sandy",
    lastName: "Bloom",
    email: "phbloomwood@gmail.com",
    avatar: null,
    newPassword: "",
    confirmPassword: "",
    interests: ["Graphisme & Peinture", "Vacances & Détente"],
    companies: [], // Stores multiple company details
  });

  // ✅ Check if user is an Admin
  const isAdmin = userData.email === "phbloomwood@gmail.com"; // Replace with real check later

  // State for adding a new category
  const [newCategory, setNewCategory] = useState({
    name: "",
    color: "#000000",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const addCategory = () => {
    if (newCategory.name.trim() === "") return;

    // Add the category to interests
    setUserData({
      ...userData,
      interests: [...userData.interests, newCategory.name],
    });

    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);

    // Reset form
    setNewCategory({ name: "", color: "#000000" });
  };

  // Company Management
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: "",
    website: "",
    logo: null,
  });

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setNewCompany({ ...newCompany, [name]: value });
  };

  const handleLogoUpload = (e) => {
    setNewCompany({
      ...newCompany,
      logo: URL.createObjectURL(e.target.files[0]),
    });
  };

  const addCompany = () => {
    if (newCompany.name && newCompany.website) {
      setUserData({
        ...userData,
        companies: [...userData.companies, newCompany],
      });
      setNewCompany({ name: "", website: "", logo: null });
      setShowCompanyForm(false);
    }
  };

  return (
    <div className="profile-container">
      {/* Left Sidebar */}
      <div className="profile-sidebar">
        <div className="avatar-container">
          <img
            src={userData.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
          />
        </div>
        <h2>{userData.pseudo}</h2>
      </div>

      {/* Right Section - Profile Form */}
      <div className="profile-form-container">
        <h1>Profile Settings</h1>
        <div className="profile-form">
          <div className="input-group">
            <label>Pseudo</label>
            <input
              type="text"
              name="pseudo"
              value={userData.pseudo}
              onChange={handleChange}
            />
          </div>
          <div className="input-group-row">
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>

          <h3>Modify Password</h3>
          <div className="input-group-row">
            <div className="input-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
              />
            </div>
          </div>

          <Interests
            selectedInterests={userData.interests}
            setSelectedInterests={(interests) =>
              setUserData({ ...userData, interests })
            }
          />

          {/* Admin Section: Add Category */}
          {isAdmin && (
            <div className="admin-category-section">
              <h3>Admin: Ajouter une catégorie</h3>
              <div className="admin-category-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Nom de la catégorie"
                  value={newCategory.name}
                  onChange={handleCategoryChange}
                />
                <input
                  type="color"
                  name="color"
                  value={newCategory.color}
                  onChange={handleCategoryChange}
                />
                <button onClick={addCategory}>Ajouter</button>
              </div>
              {showSuccessMessage && (
                <p className="success-message">Nouvelle catégorie ajoutée!</p>
              )}
            </div>
          )}

          <h3>Publicity</h3>
          {userData.companies.length === 0 ? (
            <p>No publicity entered</p>
          ) : (
            userData.companies.map((company, index) => (
              <div key={index} className="company-details">
                <p>
                  <strong>{company.name}</strong>
                </p>
                {company.logo && (
                  <img
                    src={company.logo}
                    alt="Company Logo"
                    className="company-logo"
                  />
                )}
                <p>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {company.website}
                  </a>
                </p>
              </div>
            ))
          )}

          <button
            className="add-company-btn"
            onClick={() => setShowCompanyForm(!showCompanyForm)}
          >
            {showCompanyForm ? "Cancel" : "Add a publicity"}
          </button>

          {showCompanyForm && (
            <div className="company-form">
              <div className="input-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="name"
                  value={newCompany.name}
                  onChange={handleCompanyChange}
                />
              </div>
              <div className="input-group">
                <label>Company Website</label>
                <input
                  type="text"
                  name="website"
                  value={newCompany.website}
                  onChange={handleCompanyChange}
                />
              </div>
              <div className="input-group">
                <label>Company Logo</label>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </div>
              <button className="save-btn" onClick={addCompany}>
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
