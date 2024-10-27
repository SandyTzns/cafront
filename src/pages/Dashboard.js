import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import Logo from "../assets/images/logo.png";

function Dashboard() {
  const navigate = useNavigate();

  const handleAllPostClick = () => {
    navigate("/dashboard/allposts");
  };

  const handleNewPostClick = () => {
    navigate("/dashboard/newpost");
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center mt-5">
      {/* Logo Section */}
      <img
        src={Logo}
        alt="Logo"
        style={{ maxWidth: "250px" }}
        className="mb-4"
      />

      {/* Buttons Section */}
      <div className="d-flex justify-content-center mt-4">
        <Button
          onClick={handleAllPostClick}
          variant="primary"
          style={{ width: "250px", marginRight: "15px" }}
        >
          See all posts
        </Button>
        <Button
          onClick={handleNewPostClick}
          variant="primary"
          style={{ width: "250px" }}
        >
          Create a new post
        </Button>
      </div>
    </Container>
  );
}

export default Dashboard;
