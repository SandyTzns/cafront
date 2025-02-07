import React, { useState, useEffect } from "react";
import NewPostForm from "../components/NewPostForm";
import PostList from "../components/PostList";
import "../styles/Dashboard.css";
import { getPost } from "../services/postService"; // Ensure you have this function in your postService

function Dashboard() {
  // Use local state for posts
  const [posts, setPosts] = useState([]);

  // On component mount, fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPost();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Function to add a new post to the state immediately
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
