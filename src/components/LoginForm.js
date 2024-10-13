import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function LoginForm() {
  return (
    <Form className="bg-light text-dark p-5 border shadow rounded">
      <div className="row">
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="w-100 text-start text-capitalize text-center">
            Email
          </Form.Label>
          <Form.Control type="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="w-100 text-start text-capitalize text-center">
            Mot de passe
          </Form.Label>
          <Form.Control type="text" />
        </Form.Group>
      </div>

      <Button variant="primary" type="submit">
        Submit
      </Button>

      <p className="mt-3">
        <a href="#" aria-label="Forgot password">
          j'ai oublié mon mot de passe
        </a>
      </p>
    </Form>
  );
}

export default LoginForm;
