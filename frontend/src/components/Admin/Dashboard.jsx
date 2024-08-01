import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '../../assets/images/logo.png';
import backgroundImage from '../../assets/images/8448.jpg';

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('accessToken');
    // Redirect to home page
    navigate('/');
  };

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
          <Link to="/createspace" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Space</Link>
          <Link to="/createuser" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create User</Link>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center relative z-10">
        <h1 className="text-4xl font-bold text-white mb-12">Dashboard</h1>
        <div className="flex space-x-8">
          <Link to="/spaces" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded text-xl">View Spaces</Link>
          <Link to="/users" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded text-xl">View Users</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
