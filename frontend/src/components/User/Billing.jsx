import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Billing = () => {
  const [hours, setHours] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [space, setSpace] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`https://space-hub-backend-gphk.onrender.com/spaces/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setSpace(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    fetchSpace();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = hours * space.ratecard;
    setTotalAmount(amount);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post(`https://space-hub-backend-gphk.onrender.com/spaces/${id}/book`, 
        { 
          hours, 
          phone_number: phoneNumber
        }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.message.includes('Payment initiated')) {
        setBookingId(response.data.bookingId);
        setPaymentStatus('initiated');
        // Redirect to payment status page with booking ID
        navigate(`/payment-status/${response.data.bookingId}`);
      } else {
        navigate('/invoice', { state: { hours, amount, space } });
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!space) return <p>No space details found.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full mx-4 sm:mx-6 lg:mx-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Billing</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Space Details</h3>
            <p><strong>Name:</strong> {space.name}</p>
            <p><strong>Location:</strong> {space.location}</p>
            <p><strong>Capacity:</strong> {space.capacity}</p>
            <p><strong>Amenities:</strong> {space.amenities}</p>
            <p><strong>Rate:</strong> {space.ratecard} per hour</p>
          </div>
          <div>
            <label htmlFor="hours" className="block text-gray-700 text-sm font-bold mb-2">Number of Hours</label>
            <input
              type="number"
              id="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Enter number of hours"
              className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">M-Pesa Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter M-Pesa phone number"
              className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book and Pay</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Billing;
