import React, { useState, useEffect } from "react";
import NewPostForm from "../components/NewPostForm";
import PostList from "../components/PostList";
import "../styles/Dashboard.css";

function Dashboard() {
  // Load posts from localStorage on initial render
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addNewPost = (post) => {
    setPosts([post, ...posts]);
  };

  return (
    <div className="dashboard-container">
      <div className="post-list-container">
        <NewPostForm onPostSubmit={addNewPost} />
        <PostList posts={posts} />
      </div>
    </div>
  );
}

export default Dashboard;
