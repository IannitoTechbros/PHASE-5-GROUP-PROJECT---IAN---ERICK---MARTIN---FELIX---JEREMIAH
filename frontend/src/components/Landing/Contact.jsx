import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import logo from '../../assets/images/logo.png'; 

const ContactUs = () => {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [nameError, setNameError] = useState('');
  const [messageError, setMessageError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName) {
      setNameError('Name is required');
      return;
    }
    if (!message) {
      setMessageError('Message is required');
      return;
    }
    setSubmitted(true);
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
    if (e.target.value) setNameError('');
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value) setMessageError('');
  };

  return (
    <>
      <header className='w-full flex justify-between items-center py-4 px-6 bg-blue-600'>
        <Link to="/" className='flex items-center space-x-2'>
          <img src={logo} alt="Space Hub Logo" className="w-20 h-18" />
        </Link>
        <nav className='flex space-x-4'>
          <Link to="/" className='text-lg text-white hover:text-yellow-400'>Home</Link>
        </nav>
      </header>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-6 rounded shadow">
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
                className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full hover:animate-bounce"
              />
              {nameError && <p className="text-red-500 text-xs italic">{nameError}</p>}
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
                className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full hover:animate-bounce"
              ></textarea>
              {messageError && <p className="text-red-500 text-xs italic">{messageError}</p>}
              <div className="text-right text-gray-500 text-xs mt-1">{message.length}/500</div>
            </div>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-300 hover:scale-105"
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
      <footer className='w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white'>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={30} /></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={30} /></a>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={30} /></a>
          <a href="mailto:spacehub@gmail.com"><FaEnvelope size={30} /></a>
        </div>
        <div className="text-center">
          <p>For more info contact this number: (123) 456-7890</p>
          <p>Our company email is <a href="mailto:spacehub@gmail.com" className="text-yellow-300">spacehub@gmail.com</a></p>
          <p>All rights reserved © 2024</p>
        </div>
      </footer>
    </>
  );
};

export default ContactUs;
