import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; 

const ContactUs = () => {
  const [userName, setUserName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <>
    <header className='w-full flex justify-between items-center py-4 px-6'>
    <Link to="/" className='flex items-center space-x-2'>
      <img src={logo} alt="Space Hub Logo" className="w-20 h-18" />
    </Link>
    <nav className='flex space-x-4'>
      <Link to="/" className='text-lg hover:text-yellow-400'>Home</Link>
    </nav>
  </header>
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Navigation Bar */}


      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="max-w-md w-full">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={handleNameChange}
              placeholder="Enter your name"
              className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              placeholder="Enter your message"
              className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-lg font-bold">Thanks {userName} for contacting us!</p>
        </div>
      )}
    </div>
    </>
  );
};

export default ContactUs;
