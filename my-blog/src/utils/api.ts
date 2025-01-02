// api.ts
import axios from 'axios';

// 创建 axios 实例
const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000, // 可选，设置请求超时时间
});

export default api;