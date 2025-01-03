import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, GridItem } from "@patternfly/react-core";
import { AlertSuccessModal } from "../components/AlertModal";
import AuthForm from "../components/AuthForm";
import { RegisterUserProps } from "../interfaces/AuthFormType";
import { RegisterUserRequest } from "../interfaces/UserType";

const Register: React.FC<RegisterUserProps> = ({
  onRegister,
  errorMessage
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: RegisterUserRequest = { username, password };
    await onRegister(userData); // 调用父组件传递的registerUser函数
    setIsModalOpen(true); // 模拟成功后弹出成功消息
  };
  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <>
      <div className="inner">
        <Grid>
          <GridItem span={4}>
            <AuthForm
              usernameValue={username}
              setUsernameValue={setUsername}
              passwordValue={password}
              setPasswordValue={setPassword}
              errorMessage={errorMessage}
              submitButtonText="创建"
              onSubmit={handleSubmit}
            />
          </GridItem>
        </Grid>
        {/* 提交成功后的Modal */}
        {!errorMessage && (
          <AlertSuccessModal
            isOpen={isModalOpen}
            onClose={closeModal}
            title="用户新建成功！请登录!"
          />
        )}
      </div>
    </>
  );
};
export default Register;
