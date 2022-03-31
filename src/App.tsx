import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { GlobalContext } from "./components/GlobalContext";
import { AuthLayout } from "./layout/Auth";
import { Login } from "./pages/Login";
import { config } from "./config";
import 'antd/dist/antd.css';
import { MainLayout } from "./layout/MainLayout";


function App() {
  const [store, setStore] = useState<any>({});

  return (
    <GlobalContext.Provider value={{ store, setStore }}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AuthLayout>
                <MainLayout>
                  <button
                    onClick={() => {
                      store?.authClient?.logout();
                    }}
                  >
                    退出登录
                  </button>
                </MainLayout>
              </AuthLayout>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
