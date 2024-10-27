import React from "react";
import PostCard from "./PostCard";
import { Container } from "react-bootstrap";

function Posts() {
  return (
    <Container className="d-flex justify-content-center mt-5">
      <PostCard
        category="Maritime"
        title="Titre du Post"
        link="Lien Youtube"
        createdAt="23 août 2024"
      />
    </Container>
  );
}

export default Posts;
