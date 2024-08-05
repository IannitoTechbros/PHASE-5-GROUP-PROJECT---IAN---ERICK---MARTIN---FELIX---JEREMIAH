import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/images/logo.png';

const UserSpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch('http://localhost:5000/spaces', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setSpaces(data);
        } else {
          throw new Error('Failed to fetch spaces');
        }
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    };

    fetchSpaces();

    // Check if user is logged in
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleBooking = (spaceId) => {
    if (isLoggedIn) {
      navigate(`/billing/${spaceId}`);
    } else {
      navigate('/login', { state: { redirectTo: `/billing/${spaceId}` } });
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="text-lg font-bold text-gray-800">
        <a href="/" className="flex items-center space-x-2">
          <img src={logo} alt="Space Hub Logo" className="w-14 h-14 rounded-full" />
        </a>
        </div>
        <div className="space-x-4">
          {isLoggedIn ? (
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</Link>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl w-full mx-4 sm:mx-6 lg:mx-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Available Spaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map(space => (
              <div key={space.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <img src={`http://localhost:5000/${space.image}`} alt={space.name} className="w-full h-32 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold mb-2">{space.name}</h3>
                <p className="text-gray-700 mb-2">Location: {space.location}</p>
                <p className="text-gray-700 mb-2">Capacity: {space.capacity}</p>
                <p className="text-gray-700 mb-2">Amenities: {space.amenities}</p>
                <p className="text-gray-700 mb-4">Rate: {space.ratecard}</p>
                <button
                  onClick={() => handleBooking(space.id)}
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${space.isBooked ? 'bg-red-500 cursor-not-allowed' : ''}`}
                  disabled={space.isBooked}
                >
                  {space.isBooked ? 'Booked' : 'Book Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSpaces;