import { Route, Routes } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Home from "./pages/Home/Home";
import { createContext } from "react";
import useAuth from "./hooks/useAuth";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";

export const RequireContext = createContext(null);

function App() {
  const { auth, refetch, user } = useAuth();
  return (
    <div>
      <RequireContext.Provider value={{ auth, user, refetch }}>
        <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        </Layout>
      </RequireContext.Provider>
    </div>
  );
}

export default App;
