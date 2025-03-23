import React, { useState } from "react";
import axios from "axios"; // Make sure axios is imported

const Branchadd = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [hours, setHours] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !address || !district || !phone || !email || !hours) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Create a new branch object
    const branchData = { name, address, district, phone, email, hours };

    // Send the data to the backend API
    axios
      .post("http://localhost:3001/Branch", branchData)
      .then((result) => {
        console.log(result);
        alert("Branch added successfully!");
        // Reset form data after successful submission
        setName("");
        setAddress("");
        setDistrict("");
        setPhone("");
        setEmail("");
        setHours("");
        setErrorMessage(""); // Clear any error messages
      })
      .catch((error) => {
        console.error("There was an error adding the branch:", error);
        
        // If the error response has a message, use it; otherwise, show a generic message
        const errorResponseMessage = error.response?.data?.message || "Failed to add the branch. Please try again later.";
        setErrorMessage(errorResponseMessage);
      });
  };

  return (
    <div className="flex justify-center items-center p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">Add New Branch</h1>

        {/* Display error message if any */}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Branch Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="district" className="block text-gray-700">District</label>
            <input
              type="text"
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">Phone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="hours" className="block text-gray-700">Business Hours</label>
            <input
              type="text"
              id="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4"
          >
            Add Branch
          </button>
        </form>
      </div>
    </div>
  );
};

export default Branchadd;
