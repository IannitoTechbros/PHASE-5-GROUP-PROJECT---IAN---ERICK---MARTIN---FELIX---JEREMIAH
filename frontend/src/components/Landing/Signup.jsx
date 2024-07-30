import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200">
      <form className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-12 mb-4 w-full max-w-lg transition-transform transform hover:scale-103 duration-500 ease-in-out">
        <h2 className="text-2xl text-center font-bold mb-6">New to Space Hub</h2>
        <div className="mb-4">
          <input
            className="shadow-md appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
            type="text"
            placeholder="Enter your name"
          />
          <p className="text-red-500">Name error message</p>
        </div>
        <div className="mb-4">
          <input
            className="shadow-md appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
            type="email"
            placeholder="Enter your email"
          />
          <p className="text-red-500">Email error message</p>
        </div>
        <div className="mb-4">
          <input
            className="shadow-md appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
            type="password"
            placeholder="Enter your password"
          />
          <p className="text-red-500">Password error message</p>
        </div>
        <div className="mb-4">
          <input
            className="shadow-md appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
            type="password"
            placeholder="Confirm your password"
          />
          <p className="text-red-500">Confirm password error message</p>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
          >
            Sign Up
          </button>
        </div>
        <p className="text-gray-600 text-md text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
