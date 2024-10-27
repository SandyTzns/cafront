import React from "react";
import { Card } from "react-bootstrap";

function PostCard({ category, title, link, createdAt }) {
  return (
    <Card
      className="shadow-sm rounded mb-4"
      style={{ maxWidth: "600px", borderRadius: "15px" }}
    >
      <Card.Body className="d-flex justify-content-between align-items-center">
        {/* Category Section */}
        <div
          className="d-flex align-items-center justify-content-center p-2"
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "10px",
            width: "100px",
            height: "80px",
            textAlign: "center",
            fontSize: "0.9rem",
          }}
        >
          {category}
        </div>

        {/* Content Section */}
        <div className="flex-grow-1 ms-4">
          <Card.Title
            className="mb-1"
            style={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            {title}
          </Card.Title>
          <Card.Text className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>
            {link}
          </Card.Text>
          <Card.Text className="text-muted" style={{ fontSize: "0.8rem" }}>
            Post créé par .... le {createdAt}
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PostCard;
