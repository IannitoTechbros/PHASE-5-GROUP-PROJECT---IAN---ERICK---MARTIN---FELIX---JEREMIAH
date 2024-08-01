import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import sha1 from 'sha1';

async function isPasswordPwned(password) {
  const hash = sha1(password);
  const prefix = hash.substring(0, 5);
  const suffix = hash.substring(5).toUpperCase();

  try {
    const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
    const pwnedList = response.data.split('\n').map(line => line.split(':')[0]);
    return pwnedList.includes(suffix);
  } catch (error) {
    console.error('Error checking password:', error);
    return false;
  }
}

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [message, setMessage] = useState(null);

  const toggleShowPassword = () => setShowPassword(prevState => !prevState);
  const toggleShowPasswordConfirmation = () => setShowPasswordConfirmation(prevState => !prevState);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().max(20, "Must be 20 characters or less").required("Name is required"),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
        .required('Password is required'),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required')
    }),
    onSubmit: async (values) => {
      try {
        const passwordPwned = await isPasswordPwned(values.password);
        if (passwordPwned) {
          setMessage('This password has been compromised in a data breach. Please use a different password.');
          return;
        }

        const response = await axios.post('http://localhost:5000/signup', JSON.stringify(values), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 201) {
          setMessage('User created successfully');
          formik.resetForm();
          setTimeout(() => setMessage(null), 3000);
        }
      } catch (error) {
        console.error('Error signing up:', error);
        setMessage('An error occurred. Please try again.');
      }
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200">
      <form className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-12 mb-4 w-full max-w-lg transition-transform transform hover:scale-103 duration-500 ease-in-out" onSubmit={formik.handleSubmit}>
        <h2 className="text-2xl text-center font-bold mb-6">New to Space Hub</h2>
        {message && (
          <p className='text-center mt-4 text-red-500'>{message}</p>
        )}
        <div className="mb-4">
          <input
            className="shadow-md appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
            type="text"
            placeholder="Enter your name"
            name='name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500">{formik.errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            className="shadow-md appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
            type="email"
            placeholder="Enter your email"
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}
        </div>
        <div className="mb-4 relative">
          <input
            className="shadow-md appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <button 
            type='button'
            className='absolute inset-y-0 right-0 pr-3 flex items-center leading-5'
            onClick={toggleShowPassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500">{formik.errors.password}</p>
          )}
        </div>
        <div className="mb-4 relative">
          <input
            className="shadow-md appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
            type={showPasswordConfirmation ? 'text' : 'password'}
            placeholder="Confirm your password"
            name='passwordConfirmation'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordConfirmation}
          />
          <button
            type='button'
            className='absolute inset-y-0 right-0 pr-3 flex items-center leading-5'
            onClick={toggleShowPasswordConfirmation}
            aria-label={showPasswordConfirmation ? 'Hide password confirmation' : 'Show password confirmation'}
          >
            {showPasswordConfirmation ? <FaEyeSlash /> : <FaEye />}
          </button>
          {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
            <p className="text-red-500">{formik.errors.passwordConfirmation}</p>
          )}
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
