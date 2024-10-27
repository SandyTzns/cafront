import React from "react";
import { Button, Container } from "react-bootstrap";
import Logo from "../assets/images/logo.png";

function LandingPage() {
  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <div className="d-flex align-items-center justify-content-center mb-4">
        <img
          src={Logo}
          alt="Logo"
          className="img-fluid"
          style={{ maxWidth: "250px", marginRight: "20px" }}
        />
        <div className="text-center">
          <h2>COEUR ALIZÉS SPIRIT [L'Art du Positif]</h2>
          <p>Bâtissons ce nouvel horizon</p>
          <p>
            NOS 17 RÉGIONS REGORGENT DE POSITIVITÉ <br />
            Notre plate-forme vous est ouverte pour ce partage
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="outline-primary"
          style={{ width: "250px", marginRight: "15px" }}
        >
          Log In
        </Button>
        <Button variant="outline-primary" style={{ width: "250px" }}>
          Sign Up
        </Button>
      </div>
    </Container>
  );
}

export default LandingPage;
