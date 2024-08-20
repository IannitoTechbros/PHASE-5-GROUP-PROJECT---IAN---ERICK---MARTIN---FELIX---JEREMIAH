import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../../assets/images/logo.png'; // Make sure to import your logo

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setEmail('');
      } else {
        setMessage('Subscription failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-100 py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-4">
            <div className="flex items-center">
              <img src={logo} alt="Space Hub Logo" className="w-8 h-8 rounded-full" />
              <h5 className="ml-2 text-2xl font-black tracking-wider">Space Hub</h5>
            </div>
            <p className="text-md mt-2">We create spaces for rent! Worry less, we've got you covered.</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Useful Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-300 transition duration-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-gray-300 transition duration-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300 transition duration-300">Contact Us</Link></li>
              <li><Link to="/userspaces" className="hover:text-gray-300 transition duration-300">Available Spaces</Link></li>
              <li><Link to="/login" className="hover:text-gray-300 transition duration-300">Login</Link></li>
              <li><Link to="/login" className="hover:text-gray-300 transition duration-300">Sign Up</Link></li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Stay Tuned</h3>
            <p>Send us your email to keep you tuned to receive all updates from Space Hub.</p>
            <form className="flex space-x-2 mt-4" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-700 bg-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 w-full text-white"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md transition duration-300">
                Subscribe
              </button>
            </form>
            {message && <p className="mt-4 text-blue-300">{message}</p>}
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Connect With Us</h3>
            <p>Follow us on social media:</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" className="text-gray-100 hover:text-gray-300 transition duration-300">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-100 hover:text-gray-300 transition duration-300">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" className="text-gray-100 hover:text-gray-300 transition duration-300">
                <FaYoutube className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-100 hover:text-gray-300 transition duration-300">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-100 hover:text-gray-300 transition duration-300">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Space Hub Inc. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;