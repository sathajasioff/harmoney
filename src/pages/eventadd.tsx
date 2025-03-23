import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Event {
  _id?: string;  
  name: string;
  date: string;
  image: string;
  description: string;  
}

const EventAdd = () => {
  const [event, setEvent] = useState<Event>({
    name: '',
    date: '',
    image: '',
    description: '',  
  });

  const location = useLocation();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (location.state?.event) {
      setEvent(location.state.event);
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEvent({ ...event, image: reader.result as string });
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = event._id ? 'PUT' : 'POST'; // Use PUT for edit, POST for add
      const url = event._id ? `http://localhost:3001/events/${event._id}` : 'http://localhost:3001/events';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        alert('Event saved successfully');
        navigate('/adminevent');
      } else {
        alert('Failed to save event');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('An error occurred while saving the event');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{event._id ? 'Edit Event' : 'Add Event'}</h2>

        {/* Event Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={event.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>

        {/* Event Date */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700">Event Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            rows={4}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Event Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            accept="image/*"
            required
          />
        </div>

        
        {event.image && (
          <div className="mb-4">
            <p className="text-gray-700">Image Preview:</p>
            <img src={event.image} alt="Event" className="w-32 h-32 object-cover mt-2" />
          </div>
        )}

  
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4"
        >
          {event._id ? 'Update Event' : 'Add Event'}
        </button>

  
       
      </form>
    </div>
  );
};

export default EventAdd;
