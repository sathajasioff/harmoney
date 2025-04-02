import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminContactUs = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openActions, setOpenActions] = useState(null);

  const actionsRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/ContactMessages")
      .then((response) => setMessages(response.data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setOpenActions(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleView = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/ContactMessages/${id}`
      );
      setSelectedMessage(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching message details:", error);
      alert("Failed to fetch message details.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/ContactMessages/${id}`);
      setMessages(messages.filter((message) => message._id !== id));
      alert("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete the message");
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="bg-gray-100 text-black w-72 p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/admin" className="block py-2 px-4 rounded-md hover:bg-gray-200">Dashboard</Link>
          </li>
          <li>
            <Link to="/adminuser" className="block py-2 px-4 rounded-md hover:bg-gray-200">Users Management</Link>
          </li>
          <li>
            <Link to="/admincontactus" className="block py-2 px-4 rounded-md hover:bg-gray-200">Contact Us Request</Link>
          </li>
          <li>
            <Link to="/adminbranch" className="block py-2 px-4 rounded-md hover:bg-gray-200">Branch Management</Link>
          </li>
          <li>
            <Link to="/adminevent" className="block py-2 px-4 rounded-md hover:bg-gray-200">Event Management</Link>
          </li>
          <li>
            <Link to="/logout" className="block py-2 px-4 rounded-md hover:bg-red-700 text-white">Logout</Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-black mb-6">Contact Us Requests</h1>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-black">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Subject</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Message</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
  {messages.length > 0 ? (
    messages.map((message, index) => (
      <tr
        key={message._id}
        className={`border-b ${
          index % 2 === 0 ? "bg-white" : "bg-gray-100"
        } rounded-lg shadow-sm my-2`}
      >
        <td className="px-6 py-4">{message.name}</td>
        <td className="px-6 py-4">{message.subject}</td>
        <td className="px-6 py-4">{message.email}</td>
        <td className="px-6 py-4">{message.message}</td>
        <td className="px-6 py-4 text-center relative">
          <button
            className="text-gray-600 hover:text-black focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              setOpenActions(
                openActions === message._id ? null : message._id
              );
            }}
          >
            ⋮
          </button>
          {openActions === message._id && (
            <div
              ref={actionsRef}
              className="absolute right-0 bg-white shadow-lg rounded-lg mt-1 z-50"
            >
              <button
                className="block w-full px-4 py-2 text-blue-500 hover:bg-gray-200"
                onClick={() => handleView(message._id)}
              >
                View
              </button>
              <button
                className="block w-full px-4 py-2 text-red-500 hover:bg-gray-200"
                onClick={() => handleDelete(message._id)}
              >
                Delete
              </button>
            </div>
          )}
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
      </div>
    </div>
  );
};

export default AdminContactUs;
