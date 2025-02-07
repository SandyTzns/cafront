// PostList.js
import React from "react";
import Post from "./Post";

function PostList({ posts }) {
  return (
    <div>
      {posts && posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default PostList;
