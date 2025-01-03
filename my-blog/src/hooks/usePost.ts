import { useState, useEffect } from "react";
import api from "../utils/api";
import {
  Post,
  CreatePostRequest,
  UpdatePostRequest,
} from "../interfaces/PostType";
import useUser from "./useUser"; // Importing useUser hook to get token

const usePost = () => {
  const {user, getAuthHeaders } = useUser(); // Getting auth headers from useUser hook
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 获取所有博客
  const fetchPosts = async () => {
    //setLoading(true);
    setErrorMessage(null);
    try {
      const response = await api.get("/api/posts", {
        headers: getAuthHeaders(), // 带上 token 进行认证
      });
      setPosts(response.data);
    } catch (err: any) {
      setErrorMessage(err.response?.data || "Failed to fetch posts");
    } finally {
      //setLoading(false);
    }
  };

  // 创建博客
  const createPost = async (postData: CreatePostRequest) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await api.post("/api/posts", postData, {
        headers: getAuthHeaders(), // 将 token 放入请求头中
      });
      setPosts([response.data, ...posts]); // 将新创建的帖子添加到当前列表中
    } catch (err: any) {
      setErrorMessage(err.response?.data || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  // 更新博客
  const updatePost = async (id: number, postData: UpdatePostRequest) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await api.put(`/api/posts/${id}`, postData, {
        headers: getAuthHeaders(), // 带上 token 进行认证
      });
      const updatedPost = response.data;
      setPosts(posts.map((post) => (post.id === id ? updatedPost : post))); // 更新列表中的帖子
    } catch (err: any) {
      setErrorMessage(err.response?.data || "Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  // 删除博客
  const deletePost = async (id: number) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      await api.delete(`/api/posts/${id}`, {
        headers: getAuthHeaders(), // 带上 token 进行认证
      });
      setPosts(posts.filter((post) => post.id !== id)); // 删除帖子
    } catch (err: any) {
      setErrorMessage(err.response?.data || "Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  // Hook 初始化，获取所有帖子
  useEffect(() => {
    fetchPosts();
  }, [user]);

  return {
    posts,
    loading,
    errorMessage,
    createPost,
    updatePost,
    deletePost,
  };
};

export default usePost;
