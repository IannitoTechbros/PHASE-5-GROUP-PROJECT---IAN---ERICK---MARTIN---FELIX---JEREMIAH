import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; // Adjust the path as needed

const defaultImage = 'https://picsum.photos/150'; // Default image from Picsum

const Users = () => {
  // Sample data - replace with actual data from your backend
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    // Add more users as needed
  ];

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-white shadow-md z-50">
        <a href="/" className="flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105">
          <img src={logo} alt="Space Hub Logo" className="w-20 h-18" />
        </a>
        <nav className="flex space-x-4">
          <Link to="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transform transition-transform duration-300 hover:scale-105">Back to Dashboard</Link>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md transform transition-transform duration-300 hover:scale-105">Logout</button>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto pt-16 px-4">
        <h1 className="text-3xl font-bold text-center mt-10 mb-8">Registered Users</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.length > 0 ? (
            users.map(user => (
              <div key={user.id} className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                <div className="flex items-center mb-4">
                  <img
                    src={defaultImage}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 shadow-md transform transition-transform duration-300 hover:scale-110"
                  />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
                    <p className="text-gray-700 mb-2">{user.email}</p>
                    <p className="text-gray-500">{user.role}</p>
                  </div>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 transform transition-transform duration-300 hover:scale-105"
                  onClick={() => alert(`Delete user ${user.name}`)} // Replace with actual delete function
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
