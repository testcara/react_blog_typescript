import { RegisterUserRequest, LoginUserRequest } from "./UserType";
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
