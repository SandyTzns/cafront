import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import Interests from "../components/Interests";
import { useAuth } from "../context/AuthContext";
import {
  getAllInterests,
  getUserInterests,
  addUserInterest,
  deleteUserInterest,
} from "../services/interestService";

function Profile() {
  const { user } = useAuth();

  const [userData, setUserData] = useState({
    pseudo: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    newPassword: "",
    confirmPassword: "",
    interests: [],
    companies: [],
  });

  const [allInterests, setAllInterests] = useState([]);

  useEffect(() => {
    if (user) {
      // Set basic user info
      setUserData((prev) => ({
        ...prev,
        pseudo: user.pseudo || "",
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        avatar: user.avatar || "https://via.placeholder.com/150",
      }));

      // Fetch interests from backend
      getUserInterests(user.id)
        .then((userInterests) => {
          const safeInterests = Array.isArray(userInterests)
            ? userInterests
            : [];
          setUserData((prev) => ({ ...prev, interests: safeInterests }));
        })
        .catch((err) => {
          console.error("Failed to load user interests:", err);
        });

      getAllInterests().then(setAllInterests);
    }
  }, [user]);

  // Admin check
  const isAdmin = userData.email === "phbloomwood@gmail.com"; // Update later

  // New interest (admin form)
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

  const handleToggleInterest = async (interestId, isSelected) => {
    if (!user?.id) return;
    if (isSelected) {
      await deleteUserInterest(user.id, interestId);
    } else {
      await addUserInterest(user.id, interestId);
    }
    const updated = await getUserInterests(user.id);
    setUserData((prev) => ({ ...prev, interests: updated }));
  };

  // Companies
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
            src={
              userData.avatar
                ? `http://localhost${userData.avatar}`
                : "https://via.placeholder.com/150"
            }
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

          {/* 🎯 Interests Section (linked to backend) */}
          <Interests
            selectedInterests={userData.interests}
            allInterests={allInterests}
            onToggleInterest={handleToggleInterest}
          />

          {/* Admin Section: Add Category (to be replaced by add_interest.php) */}
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
                <button
                  onClick={() => alert("Use add_interest.php instead 😉")}
                >
                  Ajouter
                </button>
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
