import React from 'react';
import logo from '../../assets/images/logo.png'; 
import clouds from '../../assets/images/742.jpg'; // Ensure this path is correct
import { Link } from 'react-router-dom';
import reliabilityIcon from '../../assets/images/reliability.png'; // Placeholder icons, update paths as necessary
import commitmentIcon from '../../assets/images/commitment.png';
import timelyDeliveryIcon from '../../assets/images/timelyDelivery.png';
import innovationIcon from '../../assets/images/innovation.png';
import customerSatisfactionIcon from '../../assets/images/customerSatisfaction.png';
import peopleFirstIcon from '../../assets/images/peopleFirst.png';
import background2 from '../../assets/images/background2.jpg'; // Ensure this path is correct
import Footer from '../common/Footer';

function About() {
  return (
    <div className='bg-gray-900 text-white min-h-screen'>
      {/* Header */}
      <header className='relative bg-transparent p-4 flex justify-between items-center' style={{ backgroundImage: `url(${clouds})`, backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <a href="/" className='flex items-center space-x-2 relative z-10'>
          <img src={logo} alt="Space Hub Logo" className="w-20 h-18" />
        </a>
        <nav className='flex space-x-4 relative z-10'>
          <Link to="/" className='hover:text-yellow-400'>Home</Link>
          <Link to="/contact" className='hover:text-yellow-400'>Contact Us</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className='relative text-white text-center py-16' style={{ backgroundImage: `url(${clouds})`, backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative z-10'>
          <h1 className='text-4xl font-bold mb-4'>Who We Are</h1>
          <p className='text-lg'>
            We are a dynamic team committed to providing you with unique event spaces and a seamless booking experience.</p>
            <p> Our mission is to make hosting events effortless and enjoyable.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className='container mx-auto px-4 py-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-300 mb-4'>Our Core Values</h2>
        </div>

        {/* Core Values Section */}
        <section className='relative py-16' style={{ backgroundImage: `url(${background2})`, backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
          <div className='absolute inset-0 bg-black opacity-50'></div>
          <div className='relative z-10 flex flex-wrap justify-center mb-12'>
            <div className='w-full md:w-1/2 lg:w-1/3 mb-6 px-4'>
              <div className='bg-gray-800 p-6 shadow-xl border border-gray-600 rounded-lg text-center transition duration-300 hover:bg-gray-700'>
                <div className='mb-4'>
                  <img src={reliabilityIcon} alt="Reliability Icon" className='w-16 h-16 mx-auto' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>Reliability</h3>
                <p className='mt-2'>
                  We ensure our clients can rely on us for transparent pricing, open communication, and consistent quality.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 mb-6 px-4'>
              <div className='bg-gray-800 p-6 shadow-xl border border-gray-600 rounded-lg text-center transition duration-300 hover:bg-gray-700'>
                <div className='mb-4'>
                  <img src={commitmentIcon} alt="Commitment Icon" className='w-16 h-16 mx-auto' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>Commitment</h3>
                <p className='mt-2'>
                  Our dedication to quality service and building lasting relationships with our clients sets us apart.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 mb-6 px-4'>
              <div className='bg-gray-800 p-6 shadow-xl border border-gray-600 rounded-lg text-center transition duration-300 hover:bg-gray-700'>
                <div className='mb-4'>
                  <img src={timelyDeliveryIcon} alt="Timely Delivery Icon" className='w-16 h-16 mx-auto' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>Timely Delivery</h3>
                <p className='mt-2'>
                  We prioritize efficiency and adhere to schedules to ensure timely delivery of our services.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 mb-6 px-4'>
              <div className='bg-gray-800 p-6 shadow-xl border border-gray-600 rounded-lg text-center transition duration-300 hover:bg-gray-700'>
                <div className='mb-4'>
                  <img src={innovationIcon} alt="Innovation Icon" className='w-16 h-16 mx-auto' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>Innovation</h3>
                <p className='mt-2'>
                  Embracing the latest tools and technologies, we innovate to provide industry-leading solutions.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 mb-6 px-4'>
              <div className='bg-gray-800 p-6 shadow-xl border border-gray-600 rounded-lg text-center transition duration-300 hover:bg-gray-700'>
                <div className='mb-4'>
                  <img src={customerSatisfactionIcon} alt="Customer Satisfaction Icon" className='w-16 h-16 mx-auto' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>Customer Satisfaction</h3>
                <p className='mt-2'>
                  We place customer satisfaction at the core of our values, crafting solutions that perfectly match client requirements.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 mb-6 px-4'>
              <div className='bg-gray-800 p-6 shadow-xl border border-gray-600 rounded-lg text-center transition duration-300 hover:bg-gray-700'>
                <div className='mb-4'>
                  <img src={peopleFirstIcon} alt="People First Icon" className='w-16 h-16 mx-auto' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>People First</h3>
                <p className='mt-2'>
                  We prioritize the well-being of our clients and workforce, ensuring a positive and supportive environment.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-300 mb-4 mt-6'>What We Do</h2>
          <p className='text-gray-400'>
            At Space Hub, we specialize in offering a diverse range of event spaces designed to meet various needs. We focus on providing venues that are both stylish and functional.
          </p>
        </div>

        <div className='text-center mb-2'>
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
                  You can rely on us for transparent pricing, open communication, and consistent quality in every interaction.
                </p>
              </div>
            </div>
            <div className='w-full sm:w-1/2 lg:w-1/3 mb-6 px-4'>
              <div className='bg-gray-800 p-6 shadow-lg border-0 rounded-lg text-center hover:bg-blue-600 hover:text-white transition-colors duration-300'>
                <div className='text-red-500 text-4xl mb-4'>
                  ⏰
                </div>
                <h3 className='text-xl font-semibold mb-2'>Timeliness</h3>
                <p className='mt-2'>
                  We adhere to schedules and prioritize efficiency to ensure timely delivery of our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default About;
