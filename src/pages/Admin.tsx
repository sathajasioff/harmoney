import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "@/components/Navbar"; // Assuming the Navbar component is located in this path

const Admin = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [contactCount, setContactCount] = useState(0); // State for contact messages count

  // Fetch Contact Us count
  useEffect(() => {
    axios.get('http://localhost:3001/ContactMessages/count')
      .then((response) => {
        setContactCount(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching contact count:', error);
      });
  }, []);

  return (
    <div className="flex h-screen">
      
      {/* Conditionally render the Navbar */}
      {showNavbar && <Navbar />} 

      <div className="bg-gray-800 text-white w-64 p-6">
        <ul>
          <li className="mb-4"><Link to="/admin" className="hover:text-gray-400">Dashboard</Link></li>
          <li className="mb-4"><Link to="/adminuser" className="hover:text-gray-400">Users Management</Link></li>
          <li className="mb-4"><Link to="/admincontactus" className="hover:text-gray-400">Contact Us request</Link></li>
          <li className="mb-4"><Link to="/adminbranch" className="hover:text-gray-400">Branch Management</Link></li>
          <li className="mb-4"><Link to="/adminevent" className="hover:text-gray-400">Event Management</Link></li>
          <li className="mb-4"><Link to="/logout" className="hover:text-gray-400">Logout</Link></li>
        </ul>
      </div>

      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-700">Welcome to the Admin Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Total Users</h3>
            <p className="text-3xl font-bold text-blue-500">1,245</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Contact us</h3>
            <p className="text-3xl font-bold text-yellow-500">{contactCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
