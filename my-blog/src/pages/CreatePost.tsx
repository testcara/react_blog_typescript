import React from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { CreatePostRequest, CreatePostProps} from "../interfaces/PostType"
 
const CreatePost: React.FC<CreatePostProps> = ({ createPost, errorMessage }) => {
  const navigate = useNavigate();

  const handleSubmit = (formData: CreatePostRequest) => {
    const newPost = {
      ...formData,
    };
    createPost(newPost);
  };


  const handleSuccess = () => {
    navigate("/myposts");
  };

  return (
    <PostForm
      post={null}
      onSubmit={handleSubmit}
      onSuccess={handleSuccess}
      title="新建博客"
      successMessage="博客新建成功！"
      cancelMessage="放弃新建！"
    />
  );
};

export default CreatePost;