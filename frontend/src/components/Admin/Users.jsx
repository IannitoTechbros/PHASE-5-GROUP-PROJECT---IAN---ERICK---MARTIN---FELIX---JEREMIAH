import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '../../assets/images/logo.png'; // Adjust the path as needed
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('https://space-hub-backend-gphk.onrender.com/users', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Filter out admins
        const filteredUsers = response.data.filter(user => user.role !== 'admin');
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data : error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`https://space-hub-backend-gphk.onrender.com/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error.response ? error.response.data : error.message);
    }
  };

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('accessToken');
    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-white shadow-md">
        <a href="/" className="flex items-center space-x-2">
          <img src={logo} alt="Space Hub Logo" className="w-20 h-18" />
        </a>
        <nav className="flex space-x-4">
          <Link to="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back to Dashboard</Link>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto pt-16 px-4">
        <h1 className="text-3xl font-bold text-center mt-10 mb-8">Registered Users</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.length > 0 ? (
            users.map(user => (
              <div key={user.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
                <p className="text-gray-700 mb-2">{user.email}</p>
                <p className="text-gray-500">{user.role}</p>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No registered users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
