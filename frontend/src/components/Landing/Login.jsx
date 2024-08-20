import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import sha1 from 'sha1';
import logo from '../../assets/images/logo.png';

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

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const toggleSignUp = () => {
    setIsSignUp(prevState => !prevState);
    console.log('isSignUp:', !isSignUp);
  };  
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowPasswordConfirmation = () => setShowPasswordConfirmation(!showPasswordConfirmation);

  const signupFormik = useFormik({
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

        const response = await axios.post('https://space-hub-backend-gphk.onrender.com/signup', JSON.stringify(values), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 201) {
          setMessage('User created successfully');
          signupFormik.resetForm();
          setTimeout(() => setMessage(null), 3000);
        }
      } catch (error) {
        console.error('Error signing up:', error);
        setMessage('An error occurred. Please try again.');
      }
    }
  });

  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (values) => {
      try {
        setMessage(null);
        const response = await axios.post('https://space-hub-backend-gphk.onrender.com/login', JSON.stringify(values), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {
          localStorage.setItem('accessToken', response.data.access_token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          const userRole = response.data.user?.role;

          if (!userRole) {
            throw new Error('User role not found in response');
          }

          setMessage('Logged in successfully');

          if (userRole === 'admin') {
            navigate('/dashboard', { replace: true });
          } else {
            navigate('/userspaces', { replace: true });
          }

          loginFormik.resetForm();
        }
      } catch (error) {
        console.error('Error logging in:', error);
        if (error.response) {
          setMessage(error.response?.data?.message || 'Invalid credentials. Please try again.');
        } else if (error.request) {
          setMessage('Network error. Please check your connection and try again.');
        } else {
          setMessage('An unexpected error occurred. Please try again.');
        }
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    }
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans">
      <div className="absolute top-4 left-4 animate-slideIn">
        <a href="/" className="flex items-center space-x-2">
          <img src={logo} alt="Space Hub Logo" className="w-14 h-14 rounded-full" />
        </a>
      </div>
      <div className={`container relative bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-4xl min-h-[480px] transition-all duration-1000 ease-in-out ${isSignUp ? 'right-panel-active' : ''}`}>

         {/* sign up form */}
        <div className={`absolute top-0 h-full transition-all duration-1000 ease-in-out ${isSignUp ? 'translate-x-full opacity-100 z-5' : 'opacity-0 z-1'} w-1/2`}>
          <form className="bg-white flex items-center justify-center flex-col px-10 h-full text-center" onSubmit={signupFormik.handleSubmit}>
            <h1 className="font-bold mb-5 text-2xl">Create Account</h1>
            <div className="flex mt-3 mb-5">
              <a href="#" className="border border-gray-300 rounded-full inline-flex justify-center items-center m-0 h-10 w-10"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className="border border-gray-300 rounded-full inline-flex justify-center items-center m-0 h-10 w-10 mx-2"><FontAwesomeIcon icon={faGooglePlusG} /></a>
              <a href="#" className="border border-gray-300 rounded-full inline-flex justify-center items-center m-0 h-10 w-10"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            </div>
            <span className="text-sm">or use your email for registration</span>
            <input type="text" placeholder="Name" className="bg-gray-100 border-none p-3 my-2 w-full" {...signupFormik.getFieldProps('name')} />
            {signupFormik.touched.name && signupFormik.errors.name && (
              <p className="text-red-500">{signupFormik.errors.name}</p>
            )}
            <input type="email" placeholder="Email" className="bg-gray-100 border-none p-3 my-2 w-full" {...signupFormik.getFieldProps('email')} />
            {signupFormik.touched.email && signupFormik.errors.email && (
              <p className="text-red-500">{signupFormik.errors.email}</p>
            )}
            <div className="relative w-full">
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="bg-gray-100 border-none p-3 my-2 w-full" {...signupFormik.getFieldProps('password')} />
              <button type="button" onClick={toggleShowPassword} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {signupFormik.touched.password && signupFormik.errors.password && (
              <p className="text-red-500">{signupFormik.errors.password}</p>
            )}
            <div className="relative w-full">
              <input type={showPasswordConfirmation ? 'text' : 'password'} placeholder="Confirm Password" className="bg-gray-100 border-none p-3 my-2 w-full" {...signupFormik.getFieldProps('passwordConfirmation')} />
              <button type="button" onClick={toggleShowPasswordConfirmation} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {showPasswordConfirmation ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {signupFormik.touched.passwordConfirmation && signupFormik.errors.passwordConfirmation && (
              <p className="text-red-500">{signupFormik.errors.passwordConfirmation}</p>
            )}
            <button className="mt-4 border rounded-full border-red-500 bg-red-500 text-white text-xs font-bold py-3 px-12 uppercase tracking-wide transition duration-300 ease-in-out hover:bg-red-600">Sign Up</button>
          </form>
        </div>

        {/* login form */}
        <div className={`absolute top-0 h-full transition-all duration-1000 ease-in-out ${isSignUp ? 'opacity-0 -translate-x-full' : 'opacity-100 translate-x-0'} w-1/2 z-2`}>
          <form className="bg-white flex items-center justify-center flex-col px-10 h-full text-center" onSubmit={loginFormik.handleSubmit}>
            <h1 className="font-bold mb-5 text-2xl">Sign in</h1>
            <div className="flex mt-3 mb-5">
              <a href="#" className="border border-gray-300 rounded-full inline-flex justify-center items-center m-0 h-10 w-10"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className="border border-gray-300 rounded-full inline-flex justify-center items-center m-0 h-10 w-10 mx-2"><FontAwesomeIcon icon={faGooglePlusG} /></a>
              <a href="#" className="border border-gray-300 rounded-full inline-flex justify-center items-center m-0 h-10 w-10"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            </div>
            <span className="text-sm">or use your account</span>
            <input type="email" placeholder="Email" className="bg-gray-100 border-none p-3 my-2 w-full" {...loginFormik.getFieldProps('email')} />
            {loginFormik.touched.email && loginFormik.errors.email && (
              <p className="text-red-500">{loginFormik.errors.email}</p>
            )}
            <div className="relative w-full">
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="bg-gray-100 border-none p-3 my-2 w-full" {...loginFormik.getFieldProps('password')} />
              <button type="button" onClick={toggleShowPassword} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {loginFormik.touched.password && loginFormik.errors.password && (
              <p className="text-red-500">{loginFormik.errors.password}</p>
            )}
            <a href="#" className="text-sm mt-4 text-gray-600">Forgot your password?</a>
            <button className="mt-4 border rounded-full border-red-500 bg-red-500 text-white text-xs font-bold py-3 px-12 uppercase tracking-wide transition duration-300 ease-in-out hover:bg-red-600">Sign In</button>
          </form>
        </div>


        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-1000 ease-in-out ${isSignUp ? '-translate-x-full' : ''} z-100`}>
          <div className={`bg-gradient-to-r from-red-500 to-pink-500 text-white relative -left-full h-full w-[200%] transition-transform duration-1000 ease-in-out ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'}`}>
            <div className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-1000 ease-in-out ${isSignUp ? 'translate-x-0' : '-translate-x-[20%]'}`}>
              <h1 className="font-bold text-3xl">Welcome Back!</h1>
              <p className="text-sm my-5">To keep connected with us please login with your personal info</p>
              <button onClick={toggleSignUp} className="bg-transparent border border-white rounded-full text-white text-xs font-bold py-3 px-12 uppercase tracking-wide transition duration-300 ease-in-out hover:bg-white hover:text-red-500">Sign In</button>
            </div>
            <div className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 right-0 transition-transform duration-1000 ease-in-out ${isSignUp ? 'translate-x-[20%]' : 'translate-x-0'}`}>
              <h1 className="font-bold text-3xl">Hello, Friend!</h1>
              <p className="text-sm my-5">Enter your personal details and start journey with us</p>
              <button onClick={toggleSignUp} className="bg-transparent border border-white rounded-full text-white text-xs font-bold py-3 px-12 uppercase tracking-wide transition duration-300 ease-in-out hover:bg-white hover:text-red-500">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      {message && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}