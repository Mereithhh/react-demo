import { Guard } from "@authing/react-ui-components";
import { User } from "@authing/react-ui-components/components/AuthingGuard/types/GuardConfig";
// 引入 css 文件
import "@authing/react-ui-components/lib/index.min.css";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../components/GlobalContext";
import { config } from "../../config";
export interface LoginProps {}
export const Login: React.FC<LoginProps> = (props) => {
  const navigate = useNavigate();
  const {store,setStore} = useContext(GlobalContext)
  const onLogin = (userInfo: User, authClient: any) => {
    setStore({
      ...store,
      user: userInfo,
      authClient
    })
    navigate("/")
  }
  return (
    <>
      <div className="login-page">
        <Guard
          appId={config.appId}
          onLogin={onLogin}
          config={{
            isSSO: true
          }}
        />
      </div>
    </>
  );
};
