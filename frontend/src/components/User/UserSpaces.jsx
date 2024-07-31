import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; 

const Spaces = () => {
  const spaces = [
    // Example spaces data
    {
      id: 1,
      name: 'Event Space A',
      location: 'Downtown',
      capacity: '100 people',
      amenities: 'Projector, Wi-Fi, Catering',
      rate: '$200/hr',
      image: 'path/to/imageA.jpg'
    },
    {
      id: 2,
      name: 'Event Space B',
      location: 'Uptown',
      capacity: '200 people',
      amenities: 'Sound System, Wi-Fi, Parking',
      rate: '$300/hr',
      image: 'path/to/imageB.jpg'
    },
    // Add more spaces as needed
  ];

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="text-lg font-bold text-gray-800">
          {/* Logo */}
          <img src={logo} alt="Space Hub Logo" className="w-20 h-18" />
        </div>
        <div className="space-x-4">
          {/* Logout Button */}
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col items-center mt-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl w-full mx-4 sm:mx-6 lg:mx-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Available Spaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map(space => (
              <div key={space.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <img src={space.image} alt={space.name} className="w-full h-32 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold mb-2">{space.name}</h3>
                <p className="text-gray-700 mb-2">Location: {space.location}</p>
                <p className="text-gray-700 mb-2">Capacity: {space.capacity}</p>
                <p className="text-gray-700 mb-2">Amenities: {space.amenities}</p>
                <p className="text-gray-700 mb-4">Rate: {space.rate}</p>
                <Link to="/billing"className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spaces;
