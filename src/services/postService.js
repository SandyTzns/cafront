// postService.js

const API_BASE_URL = "http://localhost/api/post";

// Save a new post (for text-only posts)
export const savePost = async (post) => {
  try {
    const response = await fetch(`${API_BASE_URL}/save_post.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error saving post:", error);
    throw error;
  }
};

// Save a new post with media (for posts that include file uploads)
export const savePostWithMedia = async (post, mediaFiles) => {
  try {
    // Create a FormData object
    const formData = new FormData();

    // Append text fields from the post object
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("category", post.category);
    formData.append("categoryColor", post.categoryColor);
    formData.append("subcategories", JSON.stringify(post.subcategories || []));
    formData.append("profilePic", post.profilePic || "default-profile-pic.jpg");
    formData.append("timestamp", post.timestamp || new Date().toISOString());

    // Append each media file; using the key "file" (or "file[]" if you prefer for multiple files)
    if (mediaFiles && mediaFiles.length > 0) {
      for (let i = 0; i < mediaFiles.length; i++) {
        formData.append("file", mediaFiles[i]);
      }
    }

    // Send the request without manually setting Content-Type (the browser sets it correctly)
    const response = await fetch(`${API_BASE_URL}/save_post.php`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error saving post with media:", error);
    throw error;
  }
};

// Get all posts (unchanged)
export const getPost = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/get_post.php`);
    const data = await response.json();

    if (data.success) {
      return data.data; // Return list of posts
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
