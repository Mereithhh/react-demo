import "./index.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { GlobalContext } from "../../components/GlobalContext";
import { login as fetchLogin } from "../../utils/api";
import { Button, Form, Input } from "antd";
import { getLoginState } from "../../utils";
export interface LoginProps {}
export const Login: React.FC<LoginProps> = (props) => {
  const navigate = useNavigate();
  const { store, setStore } = useContext(GlobalContext);
  const login = useCallback(
    async (username: string, password: string) => {
      const { user, token } = await fetchLogin(username, password);
      window.localStorage.setItem("_token", token);
      window.localStorage.setItem("_user", user);
      setStore({ ...store, user });
    },
    [setStore, store]
  );
  useEffect(() => {
    const hasLogin = getLoginState();
    if (hasLogin) {
      navigate("/");
    }
  });
  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <Form
            onFinish={(values) => {
              login(values.username, values.password);
            }}
            autoComplete="on"
          >
            <Form.Item name="username" required label="账号">
              <Input />
            </Form.Item>
            <Form.Item name="password" required label="密码">
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
