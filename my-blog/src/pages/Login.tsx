import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GridItem, Grid, Button } from "@patternfly/react-core";
import { AlertSuccessModal } from "../components/AlertModal";
import AuthForm from "../components/AuthForm";
import { LoginUserRequest, LoginUserProps } from "../interfaces/UserType";
const Login: React.FC<LoginUserProps> = ({
  onLogin,
  errorMessage
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: LoginUserRequest = { username, password };
    await onLogin(userData); // 调用父组件传递的registerUser函数
    setIsModalOpen(true);
  };
  // 关闭 Modal
  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };
  return (
    <div className="inner">
      <Link to="/register">
        <Button type="button">注册</Button>
      </Link>
      <Grid>
        <GridItem span={4}>
          <AuthForm
            usernameValue={username}
            setUsernameValue={setUsername}
            passwordValue={password}
            setPasswordValue={setPassword}
            onSubmit={handleSubmit}
            errorMessage={errorMessage}
            submitButtonText="登陆"
          />
        </GridItem>
      </Grid>
      {/* 提交成功后的Modal */}
      {!errorMessage && (
        <AlertSuccessModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="登陆成功！"
        />
      )}
    </div>
  );
};
export default Login;
