import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const AdminUser = () => {
  // Dummy data for users (You can fetch this from an API)
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'User' },
  ]);

  // State to control Navbar visibility
  const [showNavbar, setShowNavbar] = useState(true); // Set to true or false based on when you want the navbar to show

  // Function to handle user deletion
  const handleDelete = (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="flex h-screen">
    
      <div className="bg-gray-800 text-white w-64 p-6">
        <ul>
          <li className="mb-4">
            <Link to="/admin" className="hover:text-gray-400">Dashboard</Link>
          </li>
          <li className="mb-4">
            <Link to="/adminuser" className="hover:text-gray-400">Users Management</Link>
          </li>
          <li className="mb-4">
            <Link to="/admincontactus" className="hover:text-gray-400">Contact Us request</Link>
          </li>
          <li className="mb-4">
            <Link to="/adminbranch" className="hover:text-gray-400">Branch Management</Link>
          </li>
          <li className="mb-4">
            <Link to="/adminevent" className="hover:text-gray-400">Event Management</Link>
          </li>
          <li className="mb-4">
            <Link to="/logout" className="hover:text-gray-400">Logout</Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">User Management</h1>
        
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                      // Add logic to handle edit
                      onClick={() => alert('Edit user')}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
