import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminEvent = () => {
  // Dummy event data
  const [events, setEvents] = useState([
    { id: 1, name: 'Investment Summit 2025', date: '2025-04-15', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Annual Financial Expo', date: '2025-06-10', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Tech & Finance Meetup', date: '2025-08-22', image: 'https://via.placeholder.com/150' },
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
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Event Management</h1>
        
        {/* Event Table */}
        <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Event Name</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    <img src={event.image} alt={event.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{event.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.date}</td>
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

export default AdminEvent;
