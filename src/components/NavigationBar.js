import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
// import Logo from "../assets/images/logo.png";
import "../scss/NavigationBar.scss";

function NavigationBar() {
  return (
    <div>
      <Navbar expand="lg" className="bg-primary w-100 " data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#" className="fs-4">
            Coeur Alizés <span className="text-dark">[SPIRIT] </span>
          </Navbar.Brand>
          {/* <img
            src={Logo}
            alt="Coeur Alizés Spirit Logo"
            className="logo me-2" // Adds margin to the right of the logo
            style={{ width: "100px" }} // Adjust the logo size here
          /> */}

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto w-100 d-flex justify-content-end">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
