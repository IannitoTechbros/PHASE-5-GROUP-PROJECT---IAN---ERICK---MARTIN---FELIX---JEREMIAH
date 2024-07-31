import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Billing = () => {
  const [hours, setHours] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const rate = 50;
    const amount = hours * rate;
    setTotalAmount(amount);

    navigate('/invoice', { state: { hours, amount } });
  };

  const space = {
    name: "Cozy Conference Room",
    location: "Downtown",
    capacity: "20 people",
    amenities: "Projector, WiFi, Whiteboard",
    rate: "$50 per hour",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full mx-4 sm:mx-6 lg:mx-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Billing</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
          <div className="mb-6">
          <h3 className="text-xl font-semibold">Space Details</h3>
          <p><strong>Name:</strong> {space.name}</p>
          <p><strong>Location:</strong> {space.location}</p>
          <p><strong>Capacity:</strong> {space.capacity}</p>
          <p><strong>Amenities:</strong> {space.amenities}</p>
          <p><strong>Rate:</strong> {space.rate}</p>
        </div>
            <label htmlFor="hours" className="block text-gray-700 text-sm font-bold mb-2">
              Number of Hours
            </label>
            <input
              type="number"
              id="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Enter number of hours"
              className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Billing;
