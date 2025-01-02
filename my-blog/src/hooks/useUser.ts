import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../utils/api';
import {User,RegisterUserRequest,LoginUserRequest} from "../interfaces/UserType"
// 错误处理类型
interface Error {
  message: string;
}

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  // 从 localStorage 获取 token（如果存在）
  const getToken = () => localStorage.getItem('token');
    // 自动获取当前登录用户信息（如果 token 存在）
    useEffect(() => {
      const token = getToken();
      if (token) {
        fetchCurrentUser(); // 有 token 就获取用户信息
      }
    }, []);

  // 设置 token 到 localStorage
  const setToken = (token: string) => {
    localStorage.setItem('token', token);
  };

  // 请求头配置，包含 token（如果存在）
  const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // 获取当前登录用户信息
  const fetchCurrentUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/users/me', {
        headers: getAuthHeaders(), // 带上 token 进行认证
      });
      setUser(response.data); // 设置当前用户数据
    } catch (err) {
      setError({ message: 'Failed to fetch current user' });
    } finally {
      setLoading(false);
    }
  };

  // 获取用户信息
  const getUser = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/users/${id}`, {
        headers: getAuthHeaders(),
      });
      setUser(response.data);
    } catch (err) {
      setError({ message: 'Failed to fetch user data' });
    } finally {
      setLoading(false);
    }
  };

  // 注册用户
  const registerUser = async (userData: RegisterUserRequest) => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/api/auth/register', userData); // 注册用户
      setUser(null); // 注册成功后清除用户状态
      setError({ message: 'Registration successful, please log in.' }); // 提示用户登录
    } catch (err) {
      setError({ message: 'Failed to register user' });
    } finally {
      setLoading(false);
    }
  };

  // 登录用户
  const loginUser = async (userData: LoginUserRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/api/auth/login', userData); // 登录请求，获取 token
      const { token } = response.data;
      setToken(token); // 保存 token
      fetchCurrentUser(); // 获取当前登录用户信息
    } catch (err) {
      setError({ message: 'Failed to log in user' });
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    getUser,
    registerUser,
    loginUser, // 登录用户方法
  };
};

export default useUser;