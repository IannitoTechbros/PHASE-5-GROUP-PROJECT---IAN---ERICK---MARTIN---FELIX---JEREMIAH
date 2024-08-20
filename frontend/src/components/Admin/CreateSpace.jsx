import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateSpace = () => {
  const [spaceName, setSpaceName] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [amenities, setAmenities] = useState('');
  const [rate, setRate] = useState('');
  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', spaceName);
    formData.append('location', location);
    formData.append('capacity', capacity);
    formData.append('amenities', amenities);
    formData.append('ratecard', rate);
    if (image) {
      formData.append('image', image);
    }


    const accessToken = localStorage.getItem('accessToken');
    console.log('AccessToken:', accessToken); 

    try {
      const response = await axios.post('https://space-hub-backend-gphk.onrender.com/spaces', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
        }
      });
      console.log('Response:', response);
      setSubmitted(true);
      setError(null); 
    } catch (error) {
      console.error('Error:', error);
      setError(error.response ? error.response.data.message : 'Failed to create space');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full mx-4 sm:mx-6 lg:mx-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Create a Space</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="relative w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="spaceName" className="block text-gray-700 text-sm font-bold mb-2">
              Space Name
            </label>
            <input
              type="text"
              id="spaceName"
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              placeholder="Enter space name"
              className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2">
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Enter capacity"
              className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amenities" className="block text-gray-700 text-sm font-bold mb-2">
              Amenities
            </label>
            <textarea
              id="amenities"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              placeholder="Enter amenities"
              className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="rate" className="block text-gray-700 text-sm font-bold mb-2">
              Rate (per hour)
            </label>
            <input
              type="number"
              id="rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter rate"
              className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              required
            />
          </div>
          <div className="col-span-2 text-center">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Submit
            </button>
            {submitted && <p className="text-green-500 mt-4">Space created successfully!</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </form>
        <p className="text-gray-600 text-md text-center mt-4">
          Go back to <Link to="/dashboard" className="text-blue-500">Dashboard</Link>
        </p>
      </div>
    </div>
  );
};

export default CreateSpace;
