import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import logo from '../../assets/images/logo.png';

const ContactUs = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState(''); // Added state for email
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isAccordionOpen, setAccordionOpen] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.trim() === '' || email.trim() === '' || message.trim() === '') {
      setError('Please fill out all fields.');
    } else {
      setError('');
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (isAccordionOpen) {
      const timer = setTimeout(() => {
        setAccordionOpen(false);
      }, 60000); // Auto-collapse after 1 minute

      return () => clearTimeout(timer);
    }
  }, [isAccordionOpen]);

  return (
    <>
      <header className="w-full flex justify-between items-center py-4 px-6 bg-gray-800">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Space Hub Logo" className="w-20 h-18" />
        </Link>
        <nav className="flex space-x-4">
          <Link to="/" className="text-lg text-white hover:text-yellow-400 transition-colors">
            Home
          </Link>
        </nav>
      </header>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white py-8 space-y-8">
        {/* Contact Us Form */}
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform hover:scale-105 hover:bg-light-blue-600">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="px-3 py-2 placeholder-gray-500 text-gray-300 bg-gray-700 rounded text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500 w-full hover:bg-gray-600 transition-colors"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-3 py-2 placeholder-gray-500 text-gray-300 bg-gray-700 rounded text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500 w-full hover:bg-gray-600 transition-colors"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message"
                  className="px-3 py-2 placeholder-gray-500 text-gray-300 bg-gray-700 rounded text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500 w-full hover:bg-gray-600 transition-colors"
                ></textarea>
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Submit
              </button>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-lg font-bold">Thanks {userName} for contacting us!</p>
              <p>Feel free to follow our social media pages below!</p>
            </div>
          )}
        </div>

        {/* Social Media Accordion */}
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Follow Us On Social Media</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform hover:bg-gray-700">
            <button
              onClick={() => setAccordionOpen(!isAccordionOpen)}
              className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-500 transition-colors mb-4"
            >
              {isAccordionOpen ? 'Collapse' : 'Expand'}
            </button>
            {isAccordionOpen && (
              <ul className="space-y-2">
                {[
                  { platform: 'YouTube', url: 'https://youtube.com/traversymedia', icon: <FaYoutube className="text-red-600" />, description: 'Follow us on YouTube for the latest Space rentals' },
                  { platform: 'Twitter', url: 'https://twitter.com/traversymedia', icon: <FaTwitter className="text-blue-400" />, description: 'Follow us on Twitter for updates, article & blog shares, and more' },
                  { platform: 'Facebook', url: 'https://facebook.com/traversymedia', icon: <FaFacebookF className="text-blue-700" />, description: 'Follow us on Facebook to stay up to date with our work' },
                  { platform: 'Instagram', url: 'http://instagram.com/traversymedia', icon: <FaInstagram className="text-pink-500" />, description: 'Follow us on Instagram for a more personal look into our work' }
                ].map(({ platform, url, icon, description }) => (
                  <li key={platform} className="transition-transform transform hover:scale-105">
                    <div className="flex items-center p-4 bg-gray-700 rounded-lg shadow-lg hover:bg-gray-600 transition-all">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-2xl mr-4">
                        {icon}
                      </a>
                      <div>
                        <h3 className="text-xl font-semibold">{platform}</h3>
                        <p>{description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
