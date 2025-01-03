import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { EditPostProps, UpdatePostRequest } from "../interfaces/PostType";

const EditPost: React.FC<EditPostProps> = ({ posts, editPost }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts?.find((post) => post.id === Number(id));

  const handleSubmit = (formData: UpdatePostRequest) => {
    editPost(Number(id),formData);
  };

  const handleSuccess = () => {
    navigate(`/post/${post?.id}`);
  };

  return post ? (
    <PostForm
      post={post}
      onSubmit={handleSubmit}
      onSuccess={handleSuccess}
      title="编辑博客"
      successMessage="博客更新成功！"
      cancelMessage="放弃更新！"
    />
  ) : (
    <div>加载中...</div>
  );
};

export default EditPost;
