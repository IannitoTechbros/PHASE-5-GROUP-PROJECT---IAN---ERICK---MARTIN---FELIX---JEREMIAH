import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/images/logo.png';
import Footer from '../common/Footer';

const UserSpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [amenityFilters, setAmenityFilters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get('https://space-hub-backend-gphk.onrender.com/spaces');
        setSpaces(response.data);
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    };

    fetchSpaces();

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const handleAmenityFilterChange = (amenity) => {
    setAmenityFilters((prev) =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const filteredSpaces = spaces.filter((space) => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceFilter === '' || (
      (priceFilter === '0-50' && space.ratecard <= 50) ||
      (priceFilter === '50-100' && space.ratecard > 50 && space.ratecard <= 100) ||
      (priceFilter === '100-200' && space.ratecard > 100 && space.ratecard <= 200) ||
      (priceFilter === '200+' && space.ratecard > 200)
    );
    const matchesAmenities = amenityFilters.length === 0 || amenityFilters.every(amenity =>
      space.amenities.toLowerCase().includes(amenity.toLowerCase())
    );
    return matchesSearch && matchesPrice && matchesAmenities;
  });

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="text-lg font-bold text-gray-800">
          <a href="/" className="flex items-center space-x-2">
            <img src={logo} alt="Space Hub Logo" className="w-14 h-14 rounded-full" />
          </a>
        </div>
        <div className="space-x-4">
          {isLoggedIn ? (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col items-center mt-4 space-y-4">
        <input
          type="text"
          placeholder="Search spaces..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <div className="flex flex-wrap justify-center gap-4">
          <select
            value={priceFilter}
            onChange={handlePriceFilterChange}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Prices</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200+">$200+</option>
          </select>

          <div className="flex flex-wrap gap-2">
            {['WiFi', 'Swimming Pool', 'Parking', 'Gym', 'Conference Room'].map((amenity) => (
              <label key={amenity} className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={amenityFilters.includes(amenity)}
                  onChange={() => handleAmenityFilterChange(amenity)}
                />
                <span className="ml-2 text-gray-700 truncate max-w-xs">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Spaces Grid */}
      <div className="flex flex-col items-center mt-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl w-full mx-4 sm:mx-6 lg:mx-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Available Spaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpaces.map((space) => (
              <div
                key={space.id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <img
                  src={`https://space-hub-backend-gphk.onrender.com/${space.image}`}
                  alt={space.name}
                  className="w-full h-41 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{space.name}</h3>
                <p className="text-gray-700 mb-2">Location: {space.location}</p>
                <p className="text-gray-700 mb-2">Capacity: {space.capacity}</p>
                <p className="text-gray-700 mb-2 truncate max-w-xs">Amenities: {space.amenities}</p>
                <p className="text-gray-700 mb-4">Rate: KSh {space.ratecard}</p>
                <button
                  onClick={() => handleBooking(space.id)}
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${space.isBooked ? 'bg-red-500 cursor-not-allowed' : ''}`}
                  disabled={space.isBooked}
                >
                  {space.isBooked ? 'Booked' : (isLoggedIn ? 'Book Now' : 'Login to Book')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserSpaces;
