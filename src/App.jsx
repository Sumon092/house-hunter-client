import { Route, Routes } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Home from "./pages/Home/Home";
import { createContext } from "react";
import useAuth from "./hooks/useAuth";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import RequireAuth from "./auth/RequireAuth";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking/Booking";
import ConfirmBooking from "./components/ConfirmBooking/ConfirmBooking";
import NotFound from "./components/NotFound/NotFound";
import OwnedHouses from "./pages/Dashboard/OwnedHouse";
import Dashboard2 from "./pages/Dashboard/Dashboard";


export const RequireContext = createContext(null);

function App() {
  const { auth, refetch, user,data } = useAuth();
  
  return (
    <>
    <div className=" bg-slate-400">
      <RequireContext.Provider value={{ auth, user,data ,refetch }}>
        
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
            <Route
              path="/booking"
              element={
                <RequireAuth>
                  <Booking />
                </RequireAuth>
              }
            ></Route>
            <Route path="/register" element={<Register />}></Route>
            
            <Route path="/confirm-booking/:houseId" element={<RequireAuth><ConfirmBooking/></RequireAuth>} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/own" element={<OwnedHouses />}></Route>
            <Route path="/jhamela" element={<Dashboard2 />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Layout>
        
      </RequireContext.Provider>
    </div>
    <Toaster/>
    </>
  );
}

export default App;
