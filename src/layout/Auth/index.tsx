import { getAuthClient, initAuthClient } from "@authing/react-ui-components";
import { useCallback, useContext} from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../../components/GlobalContext";
import { config } from "../../config";
import "./index.css";

initAuthClient({
  appId: config.appId,
});
const authClient = getAuthClient();
export interface AuthProps {}
export const AuthLayout: React.FC<AuthProps> = (props) => {
  const { store } = useContext(GlobalContext);
  const getLoginState = useCallback(() => {
    if (store.user) {
      return true;
    }
    // 检测本地是否有 user
    const localUser = window.localStorage.getItem("_authing_user");
    const localToken = window.localStorage.getItem("_authing_token");
    if (localUser && localToken) {
      // 检测一下 token 是不是过期
      try {
        const userId = authClient?.checkLoggedIn();
        if (userId) {
          return true;
        }
      } catch(err) {
        return false;
      }
      return false;
    }
    return false;
  }, [store]);
  return <>{getLoginState() ? props.children : <Navigate to="/login" />}</>;
};
