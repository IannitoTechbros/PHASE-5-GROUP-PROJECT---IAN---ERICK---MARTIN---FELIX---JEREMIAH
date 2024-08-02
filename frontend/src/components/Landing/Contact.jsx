import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaYoutube, FaTwitter, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import logo from '../../assets/images/logo.png';

const ContactUs = () => {
  const [userName, setUserName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const closeWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  return (
    <>
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Welcome to the Contact Page!</h2>
            <p className="mb-4">We're glad you're here. If you have any questions, feel free to reach out.</p>
            <button
              onClick={closeWelcomeModal}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <header className='w-full flex justify-between items-center py-4 px-6 bg-gray-100'>
        <Link to="/" className='flex items-center space-x-2'>
          <img src={logo} alt="Space Hub Logo" className="w-20 h-18" />
        </Link>
        <nav className='flex space-x-4'>
          <Link to="/" className='bg-blue-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded'>
            Home
          </Link>
        </nav>
      </header>

      <main className="flex flex-col items-center bg-gray-50 py-8 flex-grow">
        <div className="card-container bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="contact-form">
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
                  className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow-lg outline-none focus:outline-none focus:ring w-full transition-transform transform hover:scale-105"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  placeholder="Enter your message"
                  className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow-lg outline-none focus:outline-none focus:ring w-full transition-transform transform hover:scale-105"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

        <div className="container mt-8 w-full max-w-2xl">
          <header className="text-center mb-4">
            <h1 className="text-2xl font-bold">Follow Us On Social Media</h1>
          </header>
          <ul className="flex justify-center space-x-4">
            {[
              {
                platform: 'YouTube',
                icon: <FaYoutube className="text-red-600" />,
                link: 'https://youtube.com/traversymedia',
                description: 'Follow us on YouTube for the latest Space rentals',
                class: 'youtube',
              },
              {
                platform: 'Twitter',
                icon: <FaTwitter className="text-blue-500" />,
                link: 'https://twitter.com/traversymedia',
                description: 'Follow us on Twitter for updates, article & blog shares, and more',
                class: 'twitter',
              },
              {
                platform: 'Facebook',
                icon: <FaFacebookF className="text-blue-700" />,
                link: 'https://facebook.com/traversymedia',
                description: 'Follow us on Facebook to stay up to date with our work',
                class: 'facebook',
              },
              {
                platform: 'Instagram',
                icon: <FaInstagram className="text-pink-500" />,
                link: 'http://instagram.com/traversymedia',
                description: 'Follow us on Instagram for a more personal look into our work',
                class: 'instagram',
              },
              {
                platform: 'Gmail',
                icon: <FaEnvelope className="text-red-600" />,
                link: 'mailto:example@gmail.com',
                description: 'Email us directly for any inquiries',
                class: 'gmail',
              },
              {
                platform: 'WhatsApp',
                icon: <FaWhatsapp className="text-green-500" />,
                link: 'https://wa.me/1234567890',
                description: 'Chat with us on WhatsApp for quick responses',
                class: 'whatsapp',
              },
            ].map((social, index) => (
              <li className={`tab ${activeAccordion === index ? 'active' : ''}`} key={index}>
                <div className={`social ${social.class}`} onClick={() => toggleAccordion(index)}>
                  <a href={social.link} target="_blank" rel="noopener noreferrer">
                    {social.icon}
                  </a>
                </div>
                {activeAccordion === index && (
                  <div className="content">
                    <h1>{social.platform}</h1>
                    <p>{social.description}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="footer bg-gray-200 py-32 text-center text-lg font-bold border-t border-gray-300 w-full mt-auto">
        <p>© SpaceHub all rights reserved 2024</p>
        <p className="mt-2">
          Visit us at: <a href="http://www.spacehub.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.spacehub.com</a>
        </p>
        <p className="mt-2">Follow us on our social media channels for updates and more!</p>
      </footer>
    </>
  );
};

export default ContactUs;
