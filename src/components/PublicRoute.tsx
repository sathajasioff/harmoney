import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  element: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("adminToken");

  
  return isAuthenticated ? <Navigate to="/Admin/Admin" replace /> : element;
};

export default PublicRoute;
