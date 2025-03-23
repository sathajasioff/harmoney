import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  // Use the Branch interface for state
  const [branches, setBranches] = useState<Branch[]>([]);

  // Fetch the branches data from the API on component mount
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch('http://localhost:3001/branches');
        if (response.ok) {
          const data: Branch[] = await response.json(); // Specify the type here
          setBranches(data);
        } else {
          alert('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
        alert('An error occurred while fetching branches');
      }
    };

    fetchBranches();
  }, []);

  // Delete a branch
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      try {
        const response = await fetch(`http://localhost:3001/branches/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setBranches(branches.filter(branch => branch._id !== id));
          alert('Branch deleted successfully');
        } else {
          alert('Failed to delete branch');
        }
      } catch (error) {
        console.error('Error deleting branch:', error);
        alert('An error occurred while deleting the branch');
      }
    }
  };

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

        <Link to="/branchadd">
          <button className="bg-green-500 text-white px-6 py-2 rounded mb-6">Add Branch</button>
        </Link>

        {/* Branch and District Table */}
        <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
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
              {branches.map(branch => (
                <tr key={branch._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{branch.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{branch.district}</td>
                  <td className="border border-gray-300 px-4 py-2">{branch.address}</td>
                  <td className="border border-gray-300 px-4 py-2">{branch.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{branch.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{branch.hours}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link to={`/branchadd`} state={{ branch }}>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
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
