import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateSpace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [space, setSpace] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`https://space-hub-backend-gphk.onrender.com/spaces/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setSpace(response.data);
      } catch (error) {
        console.error('Error fetching space:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.message : 'Failed to fetch space');
      } finally {
        setLoading(false);
      }
    };

    fetchSpace();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpace({ ...space, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`https://space-hub-backend-gphk.onrender.com/spaces/${id}`, space, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSubmitted(true);
      setError(null); 
      setTimeout(() => navigate('/spaces'), 2000); 
    } catch (error) {
      console.error('Error updating space:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : 'Failed to update space');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full mx-4 sm:mx-6 lg:mx-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Space</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Space Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={space.name || ''}
              onChange={handleChange}
              placeholder="Enter space name"
              className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
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
              name="location"
              value={space.location || ''}
              onChange={handleChange}
              placeholder="Enter location"
              className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2">
              Capacity
            </label>
            <input
              type="text"
              id="capacity"
              name="capacity"
              value={space.capacity || ''}
              onChange={handleChange}
              placeholder="Enter capacity"
              className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amenities" className="block text-gray-700 text-sm font-bold mb-2">
              Amenities
            </label>
            <textarea
              id="amenities"
              name="amenities"
              value={space.amenities || ''}
              onChange={handleChange}
              placeholder="Enter amenities"
              className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="ratecard" className="block text-gray-700 text-sm font-bold mb-2">
              Rate Card
            </label>
            <input
              type="text"
              id="ratecard"
              name="ratecard"
              value={space.ratecard || ''}
              onChange={handleChange}
              placeholder="Enter rate card"
              className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={space.image || ''}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
            />
          </div>
          <div className="col-span-2 text-center">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Update Space
            </button>
            {submitted && <p className="text-green-500 mt-4">Space updated successfully!</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </form>
        <p className="text-gray-600 text-md text-center mt-4">
          Go back to <Link to="/spaces" className="text-blue-500">Spaces</Link>
        </p>
      </div>
    </div>
  );
};

export default UpdateSpace;
