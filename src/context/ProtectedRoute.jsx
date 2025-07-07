import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ redirectPath = "/adminLogin" }) => {
  const isAuth = localStorage.getItem("Auth") === "true";
  return isAuth ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;