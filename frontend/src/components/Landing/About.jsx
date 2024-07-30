import React from 'react';
import logo from '../../assets/images/logo.png'; 
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className='bg-gray-900 text-white min-h-screen'>
      {/* Header */}
      <header className='bg-blue-900 p-4 flex justify-between items-center'>
        <a href="/" className='flex items-center space-x-2'>
          <img src={logo} alt="Space Hub Logo" className="w-20 h-18" />
        </a>
        <nav className='flex space-x-4'>
          <Link to="/" className='hover:text-yellow-400'>Home</Link>
          <Link to="/contact" className='hover:text-yellow-400'>Contact Us</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className='bg-gradient-to-r from-blue-800 to-blue-600 text-white text-center py-16'>
        <h1 className='text-4xl font-bold mb-4'>Who We Are</h1>
        <p className='text-lg'>
          We are a dynamic team committed to providing you with unique event spaces and a seamless booking experience. Our mission is to make hosting events effortless and enjoyable.
        </p>
      </section>

      {/* Main Content */}
      <main className='container mx-auto px-4 py-8'>
        <div className='flex flex-wrap justify-center mb-12'>
          <div className='w-full md:w-1/2 lg:w-1/3 mb-6 px-4'>
            <div className='bg-gray-800 hover:bg-gray-700 p-6 shadow-xl border border-gray-600 rounded-lg text-center transition duration-300'>
              <div className='text-yellow-500 text-4xl mb-4'>
                🎯
              </div>
              <h3 className='text-xl font-semibold mb-2'>Mission</h3>
              <p className='mt-2'>
                Our goal is to simplify the event planning process by providing top-notch spaces and an easy-to-use platform, ensuring a memorable experience for our clients.
              </p>
            </div>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 mb-6 px-4'>
            <div className='bg-gray-800 hover:bg-gray-700 p-6 shadow-lg border-0 rounded-lg text-center transition duration-300'>
              <div className='text-blue-500 text-4xl mb-4'>
                👁️
              </div>
              <h3 className='text-xl font-semibold mb-2'>Vision</h3>
              <p className='mt-2'>
                We envision becoming the go-to platform for event spaces, recognized for our dedication to quality, innovation, and exceptional service.
              </p>
            </div>
          </div>
        </div>

        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-300 mb-4'>What We Do</h2>
          <p className='text-gray-400'>
            At Space Hub, we specialize in offering a diverse range of event spaces designed to meet various needs. We focus on providing venues that are both stylish and functional.
          </p>
        </div>

        <div className='text-center'>
          <h2 className='text-3xl font-bold mb-6'>Why Us?</h2>
          <div className='flex flex-wrap justify-center'>
            <div className='w-full sm:w-1/2 lg:w-1/3 mb-6 px-4'>
              <div className='bg-gray-800 p-6 shadow-lg border-0 rounded-lg text-center hover:bg-blue-600 hover:text-white transition-colors duration-300'>
                <div className='text-yellow-500 text-4xl mb-4'>
                  ⭐
                </div>
                <h3 className='text-xl font-semibold mb-2'>Quality</h3>
                <p className='mt-2'>
                  We provide high-quality event spaces that ensure an outstanding experience for every occasion.
                </p>
              </div>
            </div>
            <div className='w-full sm:w-1/2 lg:w-1/3 mb-6 px-4'>
              <div className='bg-gray-800 p-6 shadow-lg border-0 rounded-lg text-center hover:bg-blue-600 hover:text-white transition-colors duration-300'>
                <div className='text-green-500 text-4xl mb-4'>
                  ✔️
                </div>
                <h3 className='text-xl font-semibold mb-2'>Reliability</h3>
                <p className='mt-2'>
                  Our platform offers dependable service with a focus on delivering consistent quality and support.
                </p>
              </div>
            </div>
            <div className='w-full sm:w-1/2 lg:w-1/3 mb-6 px-4'>
              <div className='bg-gray-800 p-6 shadow-lg border-0 rounded-lg text-center hover:bg-blue-600 hover:text-white transition-colors duration-300'>
                <div className='text-red-500 text-4xl mb-4'>
                  💵
                </div>
                <h3 className='text-xl font-semibold mb-2'>Value</h3>
                <p className='mt-2'>
                  We offer competitive pricing to ensure you receive the best value for your investment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;
