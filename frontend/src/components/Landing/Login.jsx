import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200 px-4 py-8">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 transition-transform transform hover:scale-105 duration-500 ease-in-out">
        <h2 className="text-3xl text-center font-bold mb-6">Welcome Back</h2>
        <form>
          <div className="mb-6">
            <input
              className="shadow-md appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
              type="email"
              placeholder="Enter your email"
            />
            <p className="text-red-500 mt-2">Email error message</p>
          </div>
          <div className="mb-6">
            <input
              className="shadow-md appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
              type="password"
              placeholder="Enter your password"
            />
            <p className="text-red-500 mt-2">Password error message</p>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <p className="text-gray-600 text-lg">
        Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
