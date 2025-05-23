import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/Navbar"; // Assuming Navbar component is in this path
import { FaUsers, FaEnvelope } from "react-icons/fa"; // Icons for UI enhancement

const Admin = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [contactCount, setContactCount] = useState(0); // State for contact messages count

  // Fetch Contact Us count
  useEffect(() => {
    axios
      .get("http://localhost:3001/ContactMessages/count")
      .then((response) => {
        setContactCount(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching contact count:", error);
      });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-gray-900 text-white w-72 p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/Admin/admin" className="block py-2 px-4 rounded-md transition hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/Admin/admincontactus" className="block py-2 px-4 rounded-md transition hover:bg-gray-700">
              Contact Us Request
            </Link>
          </li>
          <li>
            <Link to="/Admin/adminbranch" className="block py-2 px-4 rounded-md transition hover:bg-gray-700">
              Branch Management
            </Link>
          </li>
          <li>
            <Link to="/Admin/adminevent" className="block py-2 px-4 rounded-md transition hover:bg-gray-700">
              Event Management
            </Link>
          </li>
          <li>
            <Link to="/Admin/logout" className="block py-2 px-4 rounded-md transition hover:bg-red-700">
              Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Navbar Toggle Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => setShowNavbar(!showNavbar)}
          >
            {showNavbar ? "Hide Navbar" : "Show Navbar"}
          </button>
        </div>

        {/* Render Navbar Conditionally */}
        {showNavbar && <Navbar />}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Users Card */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg rounded-xl p-6 flex items-center space-x-4">
            <FaUsers className="text-4xl" />
            <div>
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-3xl font-bold">1,245</p>
            </div>
          </div>

          {/* Contact Us Card */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white shadow-lg rounded-xl p-6 flex items-center space-x-4">
            <FaEnvelope className="text-4xl" />
            <div>
              <h3 className="text-lg font-semibold">Contact Requests</h3>
              <p className="text-3xl font-bold">{contactCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
