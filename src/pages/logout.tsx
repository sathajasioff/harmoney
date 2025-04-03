import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
const Logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/AdminLogin"; 
  };
  
  useEffect(() => {
    localStorage.removeItem("adminToken"); 
    navigate("/AdminLogin"); 
  }, [navigate]);

  return null; 
};

export default Logout;
