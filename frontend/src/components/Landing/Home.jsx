import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../assets/images/8448.jpg'; 
import logo from '../../assets/images/logo.png'; 

const Home = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        {/* Logo */}
        <div className="absolute top-4 left-4 animate-slideIn">
          <img src={logo} alt="Space Hub Logo" className="w-20 h-18" />
        </div>
        
        {/* Navigation Links */}
        <div className="absolute top-4 right-4 flex space-x-6 text-white animate-slideIn">
          <Link to="/about" className="hover:underline text-lg transition-transform transform hover:scale-110">
            About Us
          </Link>
          <Link to="/contact" className="hover:underline text-lg transition-transform transform hover:scale-110">
            Contact Us
          </Link>
        </div>
        
        {/* Main Content */}
        <div className="text-center animate-slideIn">
          <h1 className="text-5xl font-bold mb-4">Space Hub</h1>
          <p className="text-2xl mb-8">CREATING MEMORABLE EVENTS ONE SPACE AT A TIME</p>
          <div className="flex justify-center space-x-4">
            <Link to="/signup" className="px-6 py-3 rounded text-white transition-transform transform hover:scale-105" style={{ backgroundColor: '#ff5d22' }}>
              Sign Up
            </Link>
            <Link to="/login" className="px-6 py-3 rounded text-white transition-transform transform hover:scale-105" style={{ backgroundColor: '#040244' }}>
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
