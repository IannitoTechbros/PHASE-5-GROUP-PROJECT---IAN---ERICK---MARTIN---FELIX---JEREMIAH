import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate here
import logo from '../../assets/images/logo.png';
import backgroundImage from '../../assets/images/8448.jpg';
import axios from 'axios';

const Spaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchSpaces = async () => {
      const token = localStorage.getItem('accessToken');
      console.log('AccessToken:', token);

      if (!token) {
        console.error('No token found');
        setLoading(false);
        return;
      }
      
      try {
        const response = await axios.get('https://space-hub-backend-gphk.onrender.com/spaces', {
          headers: {
            ...(token && { 'Authorization': `Bearer ${token}` }),
            'Content-Type': 'application/json'
          }
        });
        setSpaces(response.data);
      } catch (error) {
        console.error('Error fetching spaces:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`https://space-hub-backend-gphk.onrender.com/spaces/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSpaces(spaces.filter(space => space.id !== id));
    } catch (error) {
      console.error('Error deleting space:', error.response ? error.response.data : error.message);
    }
  };

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('accessToken');
    // Redirect to home page
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-50">
        <a href="/" className="flex items-center space-x-2">
          <img src={logo} alt="Space Hub Logo" className="w-20 h-18" />
        </a>
        <nav className="flex space-x-4">
          <Link to="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Dashboard</Link>
          <Link to="/createspace" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Create Space</Link>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center relative z-10 p-4">
        <h1 className="text-4xl font-bold text-white mb-12">Manage Spaces</h1>
        <div className="w-full max-w-4xl space-y-8">
          {spaces.length > 0 ? (
            spaces.map(space => (
              <div key={space.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <img src={`https://space-hub-backend-gphk.onrender.com/${space.image}`} alt={space.name} className="w-full md:w-1/4 h-48 object-cover rounded-md" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{space.name}</h2>
                  <p className="text-lg mb-2"><strong>Location:</strong> {space.location}</p>
                  <p className="text-lg mb-2"><strong>Capacity:</strong> {space.capacity}</p>
                  <p className="text-lg mb-2"><strong>Amenities:</strong> {space.amenities}</p>
                  <p className="text-lg mb-4"><strong>Rate Card / hr:</strong> {space.ratecard} $</p>
                  <Link to={`/updatespace/${space.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded">Update</Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(space.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">No spaces available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Spaces;
