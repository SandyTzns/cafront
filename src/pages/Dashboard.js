// Dashboard.js
import React, { useState, useEffect } from "react";
import NewPostForm from "../components/NewPostForm";
import PostList from "../components/PostList";
import EditPostForm from "../components/EditPostForm"; // New component for editing posts
import "../styles/Dashboard.css";
import { getPost, deletePost, editPost } from "../services/postService";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const addNewPost = (post) => {
    setPosts([post, ...posts]);
  };

  const handleDeletePost = async (post) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce post ?")) {
      try {
        const result = await deletePost(post.id);
        if (result.success) {
          setPosts(posts.filter((p) => p.id !== post.id));
        } else {
          alert("Failed to delete post: " + result.message);
        }
      } catch (error) {
        alert("Error deleting post: " + error.message);
      }
    }
  };

  // This is called when a post's "Edit" option is clicked.
  const handleEditInitiation = (post) => {
    setEditingPost(post);
    setIsEditModalOpen(true);
  };

  // This function is called by the EditPostForm after a successful edit.
  const handleEditPost = async (updatedPost) => {
    try {
      const response = await editPost(
        updatedPost,
        updatedPost.mediaFiles || []
      );
      if (response.success) {
        // Update the local state: replace the edited post with the updated post.
        const updatedPosts = posts.map((p) =>
          p.id === updatedPost.id ? { ...p, ...updatedPost } : p
        );
        setPosts(updatedPosts);
        setIsEditModalOpen(false);
        setEditingPost(null);
      } else {
        alert("Failed to edit post: " + response.message);
      }
    } catch (error) {
      console.error("Error editing post:", error);
      alert("An error occurred while editing the post.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="post-list-container">
        <NewPostForm onPostSubmit={addNewPost} />
        <PostList
          posts={posts}
          onDelete={handleDeletePost}
          onEdit={handleEditInitiation}
        />
      </div>

      {isEditModalOpen && editingPost && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditPostForm
              post={editingPost}
              onClose={() => {
                setIsEditModalOpen(false);
                setEditingPost(null);
              }}
              onPostEdit={handleEditPost}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
