/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RequireContext } from "../../App";
import Loading from "../../components/Loading/Loading";

const RequireAuth = ({ children }) => {
  const { isLoading } = useContext(RequireContext);
  const location = useLocation();
  const token = localStorage.getItem("accessToken");

  if (isLoading) {
    return <Loading />;
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
