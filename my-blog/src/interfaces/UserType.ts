// 定义用户数据类型
export interface User {
    id?: number;
    username: string;
    token?: string;
  }
  
  
  // 用户注册请求体类型
  export interface RegisterUserRequest {
    username: string;
    password: string;
  }
  
  // 用户登录请求体类型
 export interface LoginUserRequest {
    username: string;
    password: string;
  }  