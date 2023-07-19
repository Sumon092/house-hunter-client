import { Route, Routes } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Home from "./pages/Home/Home";
import { createContext } from "react";
import useAuth from "./hooks/useAuth";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import RequireAuth from "./auth/RequireAuth";
// import { Toaster } from "react-hot-toast";

export const RequireContext = createContext(null);

function App() {
  const { auth, refetch, user } = useAuth();
  console.log('auth',auth,'user',user);
  return (
    <div className=" bg-slate-400">
      <RequireContext.Provider value={{ auth, user, refetch }}>
        {/* <Toaster> */}
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            ></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </Layout>
        {/* </Toaster> */}
      </RequireContext.Provider>
    </div>
  );
}

export default App;
