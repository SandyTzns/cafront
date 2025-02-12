// postService.js

const API_BASE_URL = "/api/post";

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

// postService.js

export const editPost = async (post, mediaFiles) => {
  try {
    let formData;
    let headers = {};
    const url = "/api/post/edit_post.php";

    // If there are media files, use FormData.
    if (mediaFiles && mediaFiles.length > 0) {
      formData = new FormData();
      formData.append("id", post.id);
      formData.append("title", post.title);
      formData.append("content", post.content);
      formData.append("category", post.category);
      formData.append("categoryColor", post.categoryColor);
      formData.append("subcategories", JSON.stringify(post.subcategories));
      formData.append("profilePic", post.profilePic);
      // Append each media file.
      for (let i = 0; i < mediaFiles.length; i++) {
        formData.append("file", mediaFiles[i]);
      }
    } else {
      // If no new media, send as JSON.
      headers["Content-Type"] = "application/json";
      formData = JSON.stringify(post);
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error editing post:", error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    // We'll use GET here for simplicity, but you could use DELETE if you prefer.
    const response = await fetch(`/api/post/delete_post.php?id=${postId}`, {
      method: "GET", // Change to 'DELETE' if your server is set up for DELETE requests.
    });
    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
