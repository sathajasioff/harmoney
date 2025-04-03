import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Event {
  _id: string;
  name: string;
  date: string;
  image: string;
  description?: string;
  createdAt?: string;
}

const AdminEvent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch events
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/events');
        const data = await response.json();
        if (response.ok) {
          setEvents(data);
        } else {
          setError('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('An error occurred while fetching events');
      }
    };

    fetchEvents(); 
    const interval = setInterval(fetchEvents, 10000); 
    return () => clearInterval(interval);
  }, []);

  const deleteEvent = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/events/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Event deleted successfully');
        setEvents(events.filter(event => event._id !== id));
      } else {
        alert('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('An error occurred while deleting the event');
    }
  };

  const editEvent = (event: Event) => {
    navigate('/admin/eventadd', { state: { event } });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
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
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Event Management</h1>
        
        <Link to="/admin/eventadd" className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block">Add Event</Link>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Event Name</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    <img src={event.image} alt={event.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{event.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatDate(event.date)}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.description || 'No description available'}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => editEvent(event)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(event._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
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

export default AdminEvent;
