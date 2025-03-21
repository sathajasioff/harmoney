import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminContactUs = () => {
  // Dummy data for Contact Us messages (You can fetch this from an API)
  const [messages, setMessages] = useState([
    { id: 1, name: 'John Doe', subject: 'Issue with Order', email: 'john@example.com', message: 'I have a problem with my recent order.' },
    { id: 2, name: 'Jane Smith', subject: 'Feedback', email: 'jane@example.com', message: 'Your service is amazing, but could improve delivery time.' },
    { id: 3, name: 'Alice Johnson', subject: 'Question about Pricing', email: 'alice@example.com', message: 'Can you provide more details on your pricing structure?' },
  ]);

  // Function to handle message deletion
  const handleDelete = (id: number) => {
    const updatedMessages = messages.filter(message => message.id !== id);
    setMessages(updatedMessages);
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
            <Link to="/admincontactus" className="hover:text-gray-400">Contact Us Request</Link>
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
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Contact Us Requests</h1>
        
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Subject</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Message</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(message => (
                <tr key={message.id} className="border-b">
                  <td className="px-6 py-4">{message.name}</td>
                  <td className="px-6 py-4">{message.subject}</td>
                  <td className="px-6 py-4">{message.email}</td>
                  <td className="px-6 py-4">{message.message}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                      // Add logic to handle view or respond to message
                      onClick={() => alert('View message')}
                    >
                      View
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => handleDelete(message.id)}
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

export default AdminContactUs;
