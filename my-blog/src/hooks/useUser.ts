import { useState, useEffect } from "react";
import api from "../utils/api";
import {
  User,
  RegisterUserRequest,
  LoginUserRequest,
} from "../interfaces/UserType";

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 从 localStorage 获取 token（如果存在）
  const getToken = () => localStorage.getItem("token");
  // 自动获取当前登录用户信息（如果 token 存在）
  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchCurrentUser(); // 有 token 就获取用户信息
    }
  }, []);

  // 设置 token 到 localStorage
  const setToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  // 请求头配置，包含 token（如果存在）
  const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // 获取当前登录用户信息
  const fetchCurrentUser = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await api.get("/api/users/me", {
        headers: getAuthHeaders(), // 带上 token 进行认证
      });
      setUser(response.data); // 设置当前用户数据
    } catch (err:any) {
      const errorMessage =
      err.response?.data || "Failed to fetch current user"
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 注册用户
  const registerUser = async (userData: RegisterUserRequest) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await api.post("/api/register", userData); // 注册用户
      setUser(null); // 注册成功后清除用户状态
    } catch (err: any) {
      const errorMessage =
        err.response?.data || "Failed to register user!";
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 登录用户
  const loginUser = async (userData: LoginUserRequest) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await api.post("/api/login", userData); // 登录请求，获取 token
      const { token } = response.data;
      setToken(token); // 保存 token
      fetchCurrentUser(); // 获取当前登录用户信息
    } catch (err:any) {
      const errorMessage =
      err.response?.data || "Failed to log in!"; 
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 退出登录
  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
    setErrorMessage(null);
    setLoading(false);
  };

  return {
    user,
    loading,
    errorMessage,
    registerUser,
    loginUser, // 登录用户方法
    logoutUser,
  };
};

export default useUser;
