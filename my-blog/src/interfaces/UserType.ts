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

  export interface AuthFormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    errorMessage?: string | null;
    successMessage?: string | null;
    passwordValue: string;
    setPasswordValue: React.Dispatch<React.SetStateAction<string>>;
    usernameValue: string;
    setUsernameValue: React.Dispatch<React.SetStateAction<string>>;
    submitButtonText: string;
  }
  
  export interface RegisterUserProps {
    onRegister: (userData: RegisterUserRequest) => Promise<void>;
    errorMessage?: string | null;
  }
  export interface LoginUserProps {
    onLogin: (userData: LoginUserRequest) => Promise<void>;
    errorMessage?: string | null;
  }