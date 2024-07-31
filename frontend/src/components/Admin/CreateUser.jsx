import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const CreateUser = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showWarning, setShowWarning] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const toggleShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(prevState => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!userName) {
      newErrors.userName = 'User name is required';
    }
    if (!userEmail) {
      newErrors.userEmail = 'User email is required';
    }
    if (!userPassword) {
      newErrors.userPassword = 'User password is required';
    }
    if (userPassword !== userPasswordConfirmation) {
      newErrors.userPasswordConfirmation = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShowWarning(true);
    } else {
      setErrors({});
      setShowWarning(false);
      setSubmitted(true);
      const formData = {
        userName,
        userEmail,
        userPassword
      };
      console.log('Form submitted with data:', formData);
      // Add logic to handle form submission, e.g., sending data to a server
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-12 mb-4 w-full max-w-lg transition-transform transform hover:scale-103 duration-500 ease-in-out">
        <h2 className="text-2xl text-center font-bold mb-6">Create New User</h2>
        <div className="mb-4">
          <input
            className={`shadow-md appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300 ${errors.userName ? 'border-red-500' : ''}`}
            type="text"
            placeholder="Enter user name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName}</p>}
        </div>
        <div className="mb-4">
          <input
            className={`shadow-md appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300 ${errors.userEmail ? 'border-red-500' : ''}`}
            type="email"
            placeholder="Enter user email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          {errors.userEmail && <p className="text-red-500 text-xs mt-1">{errors.userEmail}</p>}
        </div>
        <div className="mb-4 relative">
          <input
            className={`shadow-md appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300 ${errors.userPassword ? 'border-red-500' : ''}`}
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter user password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <button
            type='button'
            className='absolute inset-y-0 right-0 pr-3 flex items-center leading-5'
            onClick={toggleShowPassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.userPassword && <p className="text-red-500 text-xs mt-1">{errors.userPassword}</p>}
        </div>
        <div className="mb-4 relative">
          <input
            className={`shadow-md appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300 ${errors.userPasswordConfirmation ? 'border-red-500' : ''}`}
            type={showPasswordConfirmation ? 'text' : 'password'}
            placeholder="Confirm user password"
            value={userPasswordConfirmation}
            onChange={(e) => setUserPasswordConfirmation(e.target.value)}
          />
          <button
            type='button'
            className='absolute inset-y-0 right-0 pr-3 flex items-center leading-5'
            onClick={toggleShowPasswordConfirmation}
            aria-label={showPasswordConfirmation ? 'Hide password confirmation' : 'Show password confirmation'}
          >
            {showPasswordConfirmation ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.userPasswordConfirmation && <p className="text-red-500 text-xs mt-1">{errors.userPasswordConfirmation}</p>}
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
          >
            Create User
          </button>
        </div>
        {showWarning && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            Please fill out all fields correctly.
          </div>
        )}
        {submitted && !showWarning && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            User created successfully!
          </div>
        )}
        <p className="text-gray-600 text-md text-center mt-4">
          Go back to <Link to="/dashboard" className="text-blue-500">Dashboard</Link>
        </p>
      </form>
    </div>
  );
};

export default CreateUser;
