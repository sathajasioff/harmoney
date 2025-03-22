import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminBranch = () => {
  // Dummy branch data
  const [branches, setBranches] = useState([
    { id: 1, name: 'New York Branch', address: '123 Finance Street, New York, NY 10001', phone: '+1 (555) 123-4567', email: 'newyork@harmonyinvestment.com', hours: 'Monday - Friday: 9AM - 5PM' },
    { id: 2, name: 'Los Angeles Branch', address: '456 Sunset Blvd, Los Angeles, CA 90028', phone: '+1 (555) 987-6543', email: 'la@harmonyinvestment.com', hours: 'Monday - Friday: 9AM - 5PM' },
  ]);

  return (
    <div className="flex h-screen">
      <div className="bg-gray-800 text-white w-64 p-6">
        <ul>
          <li className="mb-4"><Link to="/admin" className="hover:text-gray-400">Dashboard</Link></li>
          <li className="mb-4"><Link to="/adminuser" className="hover:text-gray-400">Users Management</Link></li>
          <li className="mb-4"><Link to="/admincontactus" className="hover:text-gray-400">Contact Us Requests</Link></li>
          <li className="mb-4"><Link to="/adminbranch" className="hover:text-gray-400">Branch Management</Link></li>
          <li className="mb-4"><Link to="/adminevent" className="hover:text-gray-400">Event Management</Link></li>
          <li className="mb-4"><Link to="/logout" className="hover:text-gray-400">Logout</Link></li>
        </ul>
      </div>

      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Branch Management</h1>
        
        {/* Branch Table */}
        <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Branch Name</th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Hours</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {branches.map(branch => (
                <tr key={branch.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{branch.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{branch.address}</td>
                  <td className="border border-gray-300 px-4 py-2">{branch.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{branch.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{branch.hours}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
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

export default AdminBranch;
