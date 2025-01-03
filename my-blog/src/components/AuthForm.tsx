import React, { useState } from "react";
import {
  Form,
  FormGroup,
  TextInput,
  Button,
  Alert,
  InputGroupText,
  InputGroup,
} from "@patternfly/react-core";
import { AuthFormProps } from "../interfaces/AuthFormType";

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  errorMessage,
  successMessage,
  passwordValue,
  setPasswordValue,
  usernameValue,
  setUsernameValue,
  submitButtonText,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <FormGroup label="用户名" style={{ width: "88%" }}>
          <TextInput
            isRequired
            id="username"
            value={usernameValue}
            onChange={(e) => setUsernameValue((e.target as HTMLInputElement).value)}
            placeholder="请输入用户名"
          ></TextInput>
        </FormGroup>
        <FormGroup label="密码">
          <InputGroup style={{ width: "100%" }}>
            <TextInput
              type={showPassword ? "text" : "password"}
              isRequired
              id="password"
              value={passwordValue}
              onChange={(e) => setPasswordValue((e.target as HTMLInputElement).value)}
              placeholder="请输入密码"
            ></TextInput>
            <InputGroupText>
              <Button
                type="button"
                variant="link"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "隐藏" : "显示"}
              </Button>
            </InputGroupText>
          </InputGroup>
        </FormGroup>
        {errorMessage && <Alert variant="danger" title={errorMessage} />}
        {successMessage && <Alert variant="success" title={successMessage} />}
        <Button className="button" type="submit">
          {submitButtonText}
        </Button>
      </Form>
    </div>
  );
};
export default AuthForm;