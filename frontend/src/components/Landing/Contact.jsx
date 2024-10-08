import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; 
import './ContactUs.css';
import Footer from '../common/Footer';

const ContactUs = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState(''); // State for email
  const [message, setMessage] = useState(''); // State for message
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({}); // State for validation errors

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    let formErrors = {};
    if (!userName) formErrors.userName = 'Name is required';
    if (!email) formErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = 'Email is invalid';
    if (!message) formErrors.message = 'Message is required';

    if (Object.keys(formErrors).length === 0) {
      // No errors
      setSubmitted(true);
      setErrors({});
    } else {
      // Set errors
      setErrors(formErrors);
    }
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
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
                className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              />
              {errors.userName && <p className="text-red-500 text-xs">{errors.userName}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={handleMessageChange}
                placeholder="Enter your message"
                className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
            </div>
            <div className="mb-4 flex items-center">
              <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2 mr-2">
                Rate Us:
              </label>
              <div id="rating" className="flex">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    onClick={() => handleStarClick(index)}
                    className={`w-6 h-6 cursor-pointer ${rating > index ? 'text-yellow-500' : 'text-gray-400'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
                  </svg>
                ))}
              </div>
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
            <p>Thank you for the {rating} star{rating > 1 ? 's' : ''} rating!</p>
            <p>Feel free to follow our social media pages below!</p>
          </div>
        )}
      
      </div>
      <div>
      <Footer/>
      </div>
    </>
  );
};

export default ContactUs;