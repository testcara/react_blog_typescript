import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@patternfly/react-core";
import { User } from "../interfaces/UserType";
// 为 props 指定类型
interface UserTabProps {
  user: User; // 指定 user 的类型
  outLog: () => void;
}

const UserTab: React.FC<UserTabProps> = ({ user, outLog }) => {
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    navigate("/login");
  };
  return (
    <div className="usertab">
      你好，{`${user?.username}!  `}
      { user?.id? (
        <Button onClick={outLog} variant="danger">
          退出登陆
        </Button>
      ) : (
        <Button onClick={handleLoginRedirect} variant="primary">
          登录
        </Button>
      )}
    </div>
  );
};
export default UserTab;
