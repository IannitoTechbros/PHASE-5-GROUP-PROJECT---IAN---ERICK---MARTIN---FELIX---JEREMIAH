import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentStatus = () => {
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState(null);
  const { bookingId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError('No access token found. Please log in again.');
          return;
        }

        const response = await axios.get(`https://space-hub-backend-gphk.onrender.com/booking/${bookingId}/status`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('Payment status response:', response.data);
        
        setStatus(response.data.status);
        if (response.data.status === 'completed') {
          setTimeout(() => navigate('/userspaces'), 5000); // Redirect after 5 seconds
        } else if (response.data.status === 'failed') {
          setError('Payment failed. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching payment status:', error);
        setError(error.response?.data?.message || 'Failed to fetch payment status');
      }
    };

    const intervalId = setInterval(checkPaymentStatus, 10000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [bookingId, navigate]);

  const handleRetry = () => {
    setStatus('pending');
    setError(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Payment Status</h2>
        {status === 'pending' && (
          <div className="text-yellow-500">
            <p>Payment is being processed. Please complete the payment on your M-Pesa phone.</p>
            <p className="mt-2">This page will automatically update when the payment is complete.</p>
          </div>
        )}
        {status === 'completed' && (
          <div className="text-green-500">
            <p>Payment completed successfully!</p>
            <p className="mt-2">You will be redirected to the spaces page in 5 seconds.</p>
          </div>
        )}
        {status === 'failed' && (
          <div className="text-red-500">
            <p>Payment failed. Please try again.</p>
            <button
              onClick={handleRetry}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Retry Payment
            </button>
          </div>
        )}
        {error && (
          <div className="text-red-500 mt-4">
            <p>{error}</p>
            <button
              onClick={() => navigate('/userspaces')}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Back to Spaces
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;