// 定义用户数据类型
export interface User {
    id?: number;
    username: string;
    password?: string;
    token?: string;
  }
  
  
// 用户注册请求体类型（继承 User 类型，排除 id 和 token 字段）
export interface RegisterUserRequest extends Omit<User, 'id' | 'token'> {}

// 用户登录请求体类型（继承 User 类型，排除 id 和 token 字段）
export interface LoginUserRequest extends Omit<User, 'id' | 'token'> {}

  
  // 用户登录请求体类型
 export interface LoginUserRequest {
    username: string;
    password: string;
  }  