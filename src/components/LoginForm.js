import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Logo from "../assets/images/logo.png";

function LoginForm() {
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Row className="align-items-center">
        {/* Logo Section */}
        <Col md="auto" className="text-center mb-4 mb-md-0">
          <img src={Logo} alt="Logo" style={{ maxWidth: "250px" }} />
        </Col>

        {/* Form Section */}
        <Col md="auto">
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="text-muted">Adresse Email</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="text-muted">Mot de passe</Form.Label>
              <Form.Control type="password" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Se connecter
            </Button>

            <p className="text-center mt-3">
              <a
                href="#"
                style={{ color: "#0d6efd" }}
                aria-label="Forgot password"
              >
                J'ai oublié mon mot de passe
              </a>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
