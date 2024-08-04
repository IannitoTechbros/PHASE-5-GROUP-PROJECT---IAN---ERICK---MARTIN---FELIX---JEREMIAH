import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../../assets/images/8448.jpg'; 
import logo from '../../assets/images/logo.png'; 

const Home = () => {
  const [accordionOpen, setAccordionOpen] = useState({});
  const [spaces, setSpaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [inactive, setInactive] = useState(false);
  const [titleColor, setTitleColor] = useState('rgb(255, 255, 255)');
  const [textColor, setTextColor] = useState('rgb(255, 255, 255)');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch spaces from external URL
    axios.get('https://api.example.com/spaces')
      .then(response => setSpaces(response.data))
      .catch(error => console.error('Error fetching spaces:', error));
  }, []);

  useEffect(() => {
    const handleActivity = () => {
      setInactive(false);
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => setInactive(true), 60000);
    };

    let inactivityTimeout = setTimeout(() => setInactive(true), 60000);

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      clearTimeout(inactivityTimeout);
    };
  }, []);

  const toggleAccordion = (section) => {
    setAccordionOpen((prev) => ({ ...prev, [section]: !prev[section] }));
    setInactive(false);
  };

  const filteredSpaces = spaces.filter(space =>
    space.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageClick = () => {
    navigate('/signup');
  };

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setTitleColor(generateRandomColor());
      setTextColor(generateRandomColor());
    }, 1000);

    return () => clearInterval(colorInterval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        {/* Logo and Navigation Bar */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-black bg-opacity-50">
          <img src={logo} alt="Space Hub Logo" className="w-20 h-18" />
          <div className="flex space-x-6 text-white">
            <Link to="/about" className="hover:underline text-lg transition-transform transform hover:scale-110">
              About Us
            </Link>
            <Link to="/contact" className="hover:underline text-lg transition-transform transform hover:scale-110">
              Contact Us
            </Link>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="text-center animate-slideIn mt-24">
          <h1 className="text-5xl font-bold mb-4" style={{ color: titleColor }}>Space Hub</h1>
          <p className="text-2xl mb-8" style={{ color: textColor }}>CREATING MEMORABLE EVENTS ONE SPACE AT A TIME</p>
          <div className="flex justify-center space-x-4 mb-8">
            <Link to="/signup" className="px-6 py-3 rounded text-white transition-transform transform hover:scale-105" style={{ backgroundColor: '#ff5d22' }}>
              Sign Up
            </Link>
            <Link to="/login" className="px-6 py-3 rounded text-white transition-transform transform hover:scale-105" style={{ backgroundColor: '#040244' }}>
              Log In
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="absolute top-20 w-3/4 flex justify-center items-center space-x-2 mt-8">
          <input
            type="text"
            placeholder="Search for spaces..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-lg text-black w-1/3 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500">Search</button>
        </div>

        {/* Accordion Card */}
        <div className="w-1/3 mt-16 p-6 bg-gray-800 bg-opacity-75 rounded-lg transition-transform transform hover:scale-105">
          {!inactive && (
            [
              { title: 'What is SpaceHub?', content: 'SpaceHub is a platform where you can book and pay for spaces online, ensuring a hassle-free experience for your events and activities.' },
              { title: 'About SpaceHub', content: 'Founded in 2024, SpaceHub aims to simplify the process of finding and booking spaces for all your needs, from corporate meetings to private parties.' },
              { title: 'Why Choose SpaceHub?', content: 'With a wide variety of spaces and user-friendly interface, SpaceHub offers the best solutions for your space rental needs, all at competitive prices.' },
              { title: 'Advantages of SpaceHub', content: 'Enjoy easy booking, secure payments, and a vast selection of spaces. Our platform ensures that you find the perfect space for your event, every time.' },
              { title: 'Our Mission', content: 'To connect people with the perfect spaces for their events, making the booking process simple and efficient, while providing top-notch customer service.' }
            ].map((section) => (
              <div key={section.title} className="mb-2 transition-transform transform hover:scale-105">
                <button 
                  onClick={() => toggleAccordion(section.title)}
                  className="w-full flex justify-between items-center px-4 py-2 text-lg font-semibold bg-gray-800 text-white rounded-t"
                >
                  {section.title}
                  <span>{accordionOpen[section.title] ? '-' : '+'}</span>
                </button>
                {accordionOpen[section.title] && (
                  <div className="px-4 py-2 bg-gray-700 text-white rounded-b">
                    <p>{section.content}</p>
                  </div>
                )}
              </div>
            ))
          )}
          {inactive && (
            <button 
              onClick={() => setInactive(false)}
              className="w-full flex justify-between items-center px-4 py-2 text-lg font-semibold bg-gray-800 text-white rounded transition-transform transform hover:scale-105"
            >
              Show Information
              <span>+</span>
            </button>
          )}
        </div>

        {/* Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {filteredSpaces.map(space => (
            <div 
              key={space.id}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105 hover:opacity-90"
              onClick={handleImageClick}
            >
              <img src={space.imageUrl} alt={space.name} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-semibold">
                <a href="#" className="w-full h-full flex items-center justify-center">
                  {space.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
