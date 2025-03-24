import React, { useState } from 'react';
import axios from 'axios';  // Make sure axios is imported

const Contact = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !subject || !email || !message) {
      setErrorMessage('All fields are required.');
      return;
    }

    axios.post("http://localhost:3001/Contact", { name, subject, email, message })
      .then((result) => {
        console.log(result);
        setSuccessMessage('Message sent successfully!');
        setName('');
        setSubject('');
        setEmail('');
        setMessage('');
        setErrorMessage('');
      })
      .catch((error) => {
        console.error("There was an error sending the message:", error);
        setErrorMessage('Failed to send the message. Please try again later.');
        setSuccessMessage('');  // Clear success message on error
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" style={{ fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '16px', lineHeight: '100%', letterSpacing: '0%' }}>
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        {/* Left side - Company details and map */}
        <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-300">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">Our Company</h3>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              <strong>Address:</strong> 1234 Business St, City, Country
            </p>
            <p className="text-lg text-gray-700">
              <strong>Phone:</strong> +1 234 567 890
            </p>
            <p className="text-lg text-gray-700">
              <strong>Email:</strong> info@company.com
            </p>
          </div>
          <div className="mt-8">
            <h4 className="text-xl font-semibold text-gray-800">Find Us On The Map</h4>
            <div className="mt-4 w-full h-64 bg-gray-300 rounded-lg">
              {/* Example Map (Google Maps embed or static map) */}
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed/v1/place?q=1234+Business+St,+City,+Country&key=YOUR_GOOGLE_MAPS_API_KEY"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right side - Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-300">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700">Subject</label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Message */}
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                rows={4}
                required
              />
            </div>

            
            {errorMessage && (
  <p className="text-red-600 text-sm mb-4 fade-in">{errorMessage}</p>
)}

{successMessage && (
  <p className="text-green-600 text-sm mb-4 fade-in">{successMessage}</p>
)}

            
            <button type="submit" className="w-full py-2 bg-harmony-600 text-white rounded-md hover:bg-harmony-700">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
