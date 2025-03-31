import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminContactUs = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch messages from API
  useEffect(() => {
    axios.get('http://localhost:3001/ContactMessages')
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  // Function to fetch and show a message in the modal
  const handleView = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/ContactMessages/${id}`);
      setSelectedMessage(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching message details:', error);
      alert('Failed to fetch message details.');
    }
  };

  // Function to handle message deletion
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/ContactMessages/${id}`);
      
      // Update state to remove the deleted message
      setMessages(messages.filter((message) => message._id !== id));
      
      alert('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete the message');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-6">
        <ul>
          <li className="mb-4"><Link to="/admin" className="hover:text-gray-400">Dashboard</Link></li>
          <li className="mb-4"><Link to="/admincontactus" className="hover:text-gray-400">Contact Us Request</Link></li>
          <li className="mb-4"><Link to="/adminbranch" className="hover:text-gray-400">Branch Management</Link></li>
          <li className="mb-4"><Link to="/adminevent" className="hover:text-gray-400">Event Management</Link></li>
          <li className="mb-4"><Link to="/logout" className="hover:text-gray-400">Logout</Link></li>
        </ul>
      </div>

      {/* Main Content */}
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
              {messages.length > 0 ? (
                messages.map((message) => (
                  <tr key={message._id} className="border-b">
                    <td className="px-6 py-4">{message.name}</td>
                    <td className="px-6 py-4">{message.subject}</td>
                    <td className="px-6 py-4">{message.email}</td>
                    <td className="px-6 py-4">{message.message}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                        onClick={() => handleView(message._id)}
                      >
                        View
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => handleDelete(message._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-gray-600 py-4">
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal for viewing message */}
        {isModalOpen && selectedMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
              <h2 className="text-2xl font-bold mb-4">{selectedMessage.subject}</h2>
              <p><strong>Name:</strong> {selectedMessage.name}</p>
              <p><strong>Email:</strong> {selectedMessage.email}</p>
              <p><strong>Message:</strong> {selectedMessage.message}</p>
              
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminContactUs;
