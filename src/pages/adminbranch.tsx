import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

interface Branch {
  _id: string;
  name: string;
  address: string;
  phone: string;
  manager: string;
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

      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Branch Management</h1>

        <Link to="/admin/branchadd">
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
                <th className="border border-gray-300 px-4 py-2">Manager Name</th>
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
                  <td className="border border-gray-300 px-4 py-2">{branch.manager}</td>
                  <td className="border border-gray-300 px-4 py-2">{branch.hours}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link to={`/admin/branchadd`} state={{ branch }}>
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
