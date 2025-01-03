import React from "react";
import PostList from "../components/PostList";
import { HomeProps } from "../interfaces/PostType";
const Home: React.FC<HomeProps> = ({
  user,
  posts,
  deletePost,
  editPost,
}) => {
  return (
    <PostList
      posts={posts}
      user={user}
      deletePost={deletePost}
      editPost={editPost}
    />
  );
};

export default Home;