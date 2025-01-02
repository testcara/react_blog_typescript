import React from "react";
import { Button } from "@patternfly/react-core";
import { User } from "../interfaces/UserType";
// 为 props 指定类型
interface UserTabProps {
  user: User; // 指定 user 的类型
}

const UserTab: React.FC<UserTabProps> = ({ user }) => {
  return <div className="usertab">你好，{`${user?.username}!  `}</div>;
};
export default UserTab;
