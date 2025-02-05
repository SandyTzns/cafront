import React, { useEffect, useState } from "react";
import Post from "./Post";

function PostList() {
  const [posts, setPosts] = useState([]); // State to hold fetched posts
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch posts from the backend
  const fetchPosts = async () => {
    setLoading(true); // Show loading state
    try {
      const response = await fetch("http://localhost/api/post/get_post.php");
      const data = await response.json();

      if (data.success) {
        setPosts(data.data); // Update state with fetched posts
      } else {
        console.error("Failed to fetch posts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default PostList;
