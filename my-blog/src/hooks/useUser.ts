import { useState, useEffect } from "react";
import api from "../utils/api";
import {
  User,
  RegisterUserRequest,
  LoginUserRequest,
} from "../interfaces/UserType";

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 从 localStorage 获取 token（如果存在）
  const getToken = () => localStorage.getItem("token");

  // 获取当前登录用户信息
  const fetchCurrentUser = async () => {
    setErrorMessage(null);

    try {
      const response = await api.get("/api/users/me", {
        headers: getAuthHeaders(), // 带上 token 进行认证
      });
      setUser(response.data); // 设置当前用户数据
    } catch (err: any) {
      const errorMessage = err.response?.data || "Failed to fetch current user";
      setErrorMessage(errorMessage);
    }
  };

  // 请求头配置，包含 token（如果存在）
  const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // 自动获取当前登录用户信息（如果 token 存在）
  useEffect(() => {
    setLoading(true)
    const storedToken = getToken(); // Get token from localStorage
    setToken(storedToken);  // Set the token in state
    if (storedToken && !user) {
      fetchCurrentUser(); // Fetch user data if token exists and user is not yet set
    } else {
      setLoading(false); // If no token, stop loading
    }
  }, [user]); // Only run this effect if user is null (initial load)

  // 设置 token 到 localStorage
  const storeToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  // 注册用户
  const registerUser = async (userData: RegisterUserRequest) => {
    setErrorMessage(null);

    try {
      await api.post("/api/register", userData); // 注册用户
      setUser(null); // 注册成功后清除用户状态
    } catch (err: any) {
      const errorMessage = err.response?.data || "Failed to register user!";
      setErrorMessage(errorMessage);
    }
  };

  // 登录用户
  const loginUser = async (userData: LoginUserRequest) => {
    setErrorMessage(null);

    try {
      const response = await api.post("/api/login", userData); // 登录请求，获取 token
      const { token } = response.data;
      setToken(token); // Set token in state
      storeToken(token); // Save token to localStorage
      fetchCurrentUser(); // Fetch current user data after successful login
    } catch (err: any) {
      const errorMessage = err.response?.data || "Failed to log in!";
      setErrorMessage(errorMessage);
    }
  };

  // 退出登录
  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null); // Clear user state
    setErrorMessage(null);
    setLoading(false);
  };

  return {
    user,
    loading,
    errorMessage,
    getAuthHeaders,
    registerUser,
    loginUser, // 登录用户方法
    logoutUser,
  };
};

export default useUser;
