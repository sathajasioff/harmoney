import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("adminToken"); // Check if token exists

  return isAuthenticated ? element : <Navigate to="/Admin
  " replace />;
};

export default ProtectedRoute;
