import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const CreateUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(prevState => !prevState);
  const toggleShowPasswordConfirmation = () => setShowPasswordConfirmation(prevState => !prevState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post('http://localhost:5000/signup', { name, email, password });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-12 mb-4 w-full max-w-lg transition-transform transform hover:scale-103 duration-500 ease-in-out">
        <h2 className="text-2xl text-center font-bold mb-6">Create New User</h2>
        <div className="mb-4">
          <input
            className="shadow-md appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
            type="text"
            placeholder="Enter user name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow-md appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
            type="email"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 relative">
          <input
            className="shadow-md appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter user password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type='button'
            className='absolute inset-y-0 right-0 pr-3 flex items-center leading-5'
            onClick={toggleShowPassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="mb-6 relative">
          <input
            className="shadow-md appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
            type={showPasswordConfirmation ? 'text' : 'password'}
            placeholder="Confirm password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
          <button 
            type='button'
            className='absolute inset-y-0 right-0 pr-3 flex items-center leading-5'
            onClick={toggleShowPasswordConfirmation}
            aria-label={showPasswordConfirmation ? 'Hide password confirmation' : 'Show password confirmation'}
          >
            {showPasswordConfirmation ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105 duration-300"
          >
            Create User
          </button>
          <Link 
            to="/dashboard" 
            className="text-blue-500 hover:text-blue-700 font-bold"
          >
            Back to Dashboard
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;