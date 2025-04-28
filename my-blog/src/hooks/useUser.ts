import { useState, useEffect } from "react";
import api from "../utils/api";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 从 localStorage 获取 token（如果存在）
  const getToken = () => localStorage.getItem("token");

  // 动态生成带 token 的请求头
  const getAuthHeaders = () => {
    const currentToken = token || getToken();
    return currentToken ? { Authorization: `Bearer ${currentToken}` } : {};
  };

  // 获取当前登录用户信息
  const fetchCurrentUser = async () => {
    setErrorMessage(null);

    try {
      console.log("Fetching current user...");
      const response = await api.get("/api/users/me", {
        headers: getAuthHeaders(), // 使用 getAuthHeaders 方法
      });
      console.log("Fetched user data:", response.data);
      setUser(response.data); // 设置当前用户数据
      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching current user:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to fetch current user";
      setErrorMessage(errorMessage);
    }
  };

  // 自动获取当前登录用户信息（如果 token 存在）
  useEffect(() => {
    setLoading(true);
    const storedToken = getToken(); // 从 localStorage 获取 token
    if (storedToken) {
      setToken(storedToken); // 设置 token 到状态
      fetchCurrentUser(); // 使用存储的 token 获取用户信息
    } else {
      setLoading(false); // 如果没有 token，停止加载
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 仅在组件挂载时运行一次

  // 设置 token 到 localStorage
  const storeToken = (newToken: string) => {
    if (!newToken) {
      console.error("storeToken called with invalid token:", newToken);
      return;
    }

    try {
      localStorage.removeItem("token");
      localStorage.setItem("token", newToken); // 存储 token 到 localStorage
      setToken(newToken); // 同步更新状态
      console.log("Token stored in localStorage:", token); // 验证存储是否成功
    } catch (err) {
      console.error("Failed to store token in localStorage:", err);
    }
  };

  // 注册用户
  const registerUser = async (userData: any) => {
    setErrorMessage(null);

    try {
      await api.post("/api/register", userData); // 注册用户
      setUser(null); // 注册成功后清除用户状态
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to register user!";
      setErrorMessage(errorMessage);
    }
  };

  // 登录用户
  const loginUser = async (userData: any) => {
    setErrorMessage(null);

    try {
      const response = await api.post("/api/login", userData); // 登录请求，获取 token
      const fetchedToken = response.data.token;

      if (!fetchedToken) {
        throw new Error("Login failed: No token received");
      }

      console.log("Fetched token:", fetchedToken); // 验证 token 是否正确

      storeToken(fetchedToken); // 将 token 存储到 localStorage 和状态
      console.log(
        "Stored token in localStorage:",
        localStorage.getItem("token")
      ); // 验证存储是否成功

      await fetchCurrentUser(); // 使用新 token 获取用户信息
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to log in!";
      setErrorMessage(errorMessage);
    }
  };

  // 退出登录
  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null); // 清除用户状态
    setErrorMessage(null);
    setLoading(false);
  };

  return {
    user,
    loading,
    errorMessage,
    getAuthHeaders, // 添加 getAuthHeaders 到返回对象
    registerUser,
    loginUser,
    logoutUser,
  };
};

export default useUser;
