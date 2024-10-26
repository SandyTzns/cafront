import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../scss/NewPost.scss";

function NewPost() {
  return (
    <Container className="d-flex justify-content-center mt-5">
      <div>
        <Form>
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm="4" className="fw-bold text-start">
              Catégorie
            </Form.Label>
            <Col sm="8">
              <Form.Select>
                <option>Choisir la catégorie</option>
                <option>Musical</option>
                <option>Événementiel</option>
                {/* Add more options as needed */}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm="4" className="fw-bold text-start">
              Titre
            </Form.Label>
            <Col sm="8">
              <Form.Control type="text" placeholder="Entrez le titre" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm="4" className="fw-bold text-start">
              Lien
            </Form.Label>
            <Col sm="8">
              <Form.Control type="text" placeholder="Entrez un lien" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm="4" className="fw-bold text-start">
              Media
            </Form.Label>
            <Col sm="8">
              <Form.Control type="file" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4 align-items-center">
            <Form.Label column sm="4" className="fw-bold text-start">
              Message
            </Form.Label>
            <Col sm="8">
              <Form.Control
                as="textarea"
                placeholder="Entrez votre message"
                rows={3}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Je confirme que cette diffusion reflète les conditions d’utilisation"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Envoyer
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default NewPost;

// to do
// the police is too big and bland, use an appropriate police and size
//
//
