import React from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full mx-4 sm:mx-6 lg:mx-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Thank You for Your Booking!</h2>
        <p className="text-lg text-center mb-6">
          Your booking has been successfully processed. We look forward to hosting your event. 
        </p>
        <div className="text-center">
          <Link to="/userspaces" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back to Spaces
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
