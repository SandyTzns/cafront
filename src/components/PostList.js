// PostList.js
import React from "react";
import Post from "./Post";

function PostList({ posts, onDelete, onEdit }) {
  return (
    <div>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post.id} post={post} onDelete={onDelete} onEdit={onEdit} />
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default PostList;
