import "./index.css";
import { Layout, Menu } from "antd";
import { useContext } from "react";
import { GlobalContext } from "../../components/GlobalContext";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";
import { logout } from "../../utils";
const { Header, Content, Sider } = Layout;
export interface MainLayoutProps {}
export const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const nav = useNavigate();
  const { store, setStore } = useContext(GlobalContext);
  return (
    <Layout className="main">
      <Header className="header">
        <div className="logo" style={{ color: "white" }}>
          <img src={config.logoUrl} width={38}></img>
          <span style={{marginLeft: 8,fontSize: 18}}>{config.title}</span>
        </div>
        <div
          className="logout"
          onClick={() => {
            logout();
            nav("/login");
          }}
        >
          退出登录
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1">历史数据</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
