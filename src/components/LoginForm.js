import React from "react";
import { Form, Button, Container } from "react-bootstrap";

function LoginForm() {
  return (
    <Container className="d-flex justify-content-center">
      <Form
        className="bg-light text-dark p-5 border rounded shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <Form.Group className="mb-4" controlId="email">
          <Form.Label className="text-start w-100 text-muted">
            Adresse Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez votre adresse email"
            className="p-2"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="password">
          <Form.Label className="text-start w-100 text-muted">
            Mot de passe
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrez votre mot de passe"
            className="p-2"
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100 p-2"
          style={{ fontWeight: "bold" }}
        >
          Se connecter
        </Button>

        <p className="mt-3 text-center">
          <a
            href="#"
            className="text-decoration-none"
            style={{ color: "#0d6efd" }}
            aria-label="Forgot password"
          >
            J'ai oublié mon mot de passe
          </a>
        </p>
      </Form>
    </Container>
  );
}

export default LoginForm;
