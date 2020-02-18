import React, { useState } from "react";

const ReadPost = () => {
  const [post, setPost] = useState([]);
  return (
    <div>
      {/* <p>{post.created_at}</p> */}
      {/* <h2>{post.title}</h2> */}
      {/* <p>by {post.author}</p> */}
      {/* <p>{post.content}</p> */}
    </div>
  );
};

export default ReadPost;
