import React from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import "../styles/AuthPage.css";

function AuthPage() {
  return (
    <div className="auth-page">
      {/* Section Login */}
      <div className="auth-panel login-panel">
        <Login />
      </div>

      {/* Section SignUp */}
      <div className="auth-panel signup-panel">
        <SignUp />
      </div>
    </div>
  );
}

export default AuthPage;
