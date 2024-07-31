import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; // Adjust the path as needed

// Default image URL from CreateSpace.jsx
const defaultImage = 'https://via.placeholder.com/150'; // Replace with the actual URL used in CreateSpace.jsx

const Spaces = () => {
  // Sample spaces data (replace with real data)
  const spaces = [
    {
      id: 1,
      image: '', // No image provided
      name: 'Space One',
      location: 'Location One',
      capacity: '50',
      amenities: 'Wi-Fi, Projector',
      ratecard: '$200/hr'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150', // Placeholder image
      name: 'Space Two',
      location: 'Location Two',
      capacity: '100',
      amenities: 'Wi-Fi, Sound System',
      ratecard: '$350/hr'
    }
    // Add more spaces as needed
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-200 to-blue-500">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-50">
        <a href="/" className="flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105">
          <img src={logo} alt="Space Hub Logo" className="w-20 h-18" />
        </a>
        <nav className="flex space-x-4">
          <Link to="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105">Dashboard</Link>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105">Logout</button>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center relative z-10 p-4">
        <h1 className="text-4xl font-bold text-white mb-12">Manage Spaces</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {spaces.map(space => (
            <div key={space.id} className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <div className="overflow-hidden rounded-md">
                <img
                  src={space.image || defaultImage}
                  alt={space.name}
                  className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-125"
                />
              </div>
              <div className="text-left mt-4">
                <h2 className="text-2xl font-bold mb-2">{space.name}</h2>
                <p className="text-lg mb-2"><strong>Location:</strong> {space.location}</p>
                <p className="text-lg mb-2"><strong>Capacity:</strong> {space.capacity}</p>
                <p className="text-lg mb-2"><strong>Amenities:</strong> {space.amenities}</p>
                <p className="text-lg mb-4"><strong>Rate Card:</strong> {space.ratecard}</p>
                <div className="flex space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Spaces;
