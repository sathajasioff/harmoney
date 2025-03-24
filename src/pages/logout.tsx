import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session data or token (if using any)
    localStorage.removeItem("userToken"); // Example, adjust based on your setup
    sessionStorage.removeItem("userToken"); // Example, adjust based on your setup

    // Redirect to the home page
    navigate("/"); // Home page URL
  }, [navigate]);

  return <div>Logging out...</div>; // Show a message or loading state during logout
};

export default Logout;
