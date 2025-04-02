import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Define the type for the branch
interface Branch {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  district: string;
}

const AdminBranch = () => {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch("http://localhost:3001/branches");
        if (response.ok) {
          const data: Branch[] = await response.json();
          setBranches(data);
        } else {
          alert("Failed to fetch branches");
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
        alert("An error occurred while fetching branches");
      }
    };

    fetchBranches();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      try {
        const response = await fetch(`http://localhost:3001/branches/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setBranches(branches.filter((branch) => branch._id !== id));
          alert("Branch deleted successfully");
        } else {
          alert("Failed to delete branch");
        }
      } catch (error) {
        console.error("Error deleting branch:", error);
        alert("An error occurred while deleting the branch");
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-900 text-white w-72 p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/admin" className="block py-2 px-4 rounded-md transition hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/adminuser" className="block py-2 px-4 rounded-md transition hover:bg-gray-700">
              Users Management
            </Link>
          </li>
          <li>
            <Link to="/admincontactus" className="block py-2 px-4 rounded-md transition hover:bg-gray-700">
              Contact Us Request
            </Link>
          </li>
          <li>
            <Link to="/adminbranch" className="block py-2 px-4 rounded-md transition hover:bg-gray-700">
              Branch Management
            </Link>
          </li>
          <li>
            <Link to="/adminevent" className="block py-2 px-4 rounded-md transition hover:bg-gray-700">
              Event Management
            </Link>
          </li>
          <li>
            <Link to="/logout" className="block py-2 px-4 rounded-md transition hover:bg-red-700">
              Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Branch Management</h1>

        <Link to="/branchadd">
          <button className="bg-green-500 text-white px-6 py-2 rounded mb-6 hover:bg-green-600">
            Add Branch
          </button>
        </Link>

        {/* Branch Table */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-300 px-4 py-2">Branch Name</th>
                <th className="border border-gray-300 px-4 py-2">District</th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Hours</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => (
                <tr key={branch._id} className="text-center bg-gray-50 hover:bg-gray-100 transition">
                  <td className="border border-gray-300 px-4 py-2">{branch.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{branch.district}</td>
                  <td className="border border-gray-300 px-4 py-2">{branch.address}</td>
                  <td className="border border-gray-300 px-4 py-2">{branch.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{branch.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{branch.hours}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2 py-2">
                    <Link to="/branchadd" state={{ branch }}>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      onClick={() => handleDelete(branch._id)}
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

export default AdminBranch;
