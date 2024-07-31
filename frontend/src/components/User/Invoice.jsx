import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Invoice = () => {
  const location = useLocation();
  const { hours, amount } = location.state || { hours: 0, amount: 0 };
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
        <h2 className="text-2xl font-bold mb-4 text-center">Invoice</h2>
        <h3 className="text-xl font-semibold">Booking Details</h3>
          <p><strong>Name:</strong> {space.name}</p>
          <p><strong>Location:</strong> {space.location}</p>
          <p><strong>Capacity:</strong> {space.capacity}</p>
          <p><strong>Amenities:</strong> {space.amenities}</p>
          <p><strong>Rate:</strong> {space.rate}</p>
          <p><strong>Hours:</strong> {hours}</p>
        <div className="space-y-4">
          <p className="text-lg">Number of Hours: <span className="font-bold">{hours}</span></p>
          <p className="text-lg">Total Amount: <span className="font-bold">${amount}</span></p>
        </div>
        <div className="text-center mt-6">
          <Link to="/checkout" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
