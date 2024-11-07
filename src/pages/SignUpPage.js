import React from "react";
import Logo from "../assets/images/logo.png";
import SignUpForm from "../components/SignUpForm";

function SignUpPage() {
  return (
    <div>
      <div
        className="container my-5 d-flex justify-content-center"
        style={{ alignItems: "center" }}
      >
        <div className="row align-items-center">
          <div className="col-12 col-md-4 text-center">
            <img
              src={Logo}
              alt="Logo"
              className="img-fluid"
              style={{ maxWidth: "150px" }}
            />
          </div>
          <div className="col-12 col-md-8 text-center text-md-start">
            <h2 className="display-4">INSCRIPTION</h2>
          </div>
        </div>
      </div>
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
