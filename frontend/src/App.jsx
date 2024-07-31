import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Landing/Home';   // Updated path
import About from './components/Landing/About'; // Updated path
import Contact from './components/Landing/Contact'; // Updated path
import Login from './components/Landing/Login'; // Updated path
import Signup from './components/Landing/Signup'; // Updated path
import CreateSpace from './components/Admin/CreateSpace'; // Updated path
import Dashboard from './components/Admin/Dashboard';
import CreateUser from './components/Admin/CreateUser';
import Spaces from './components/Admin/Spaces';
import Users from './components/Admin/Users';
import UserSpaces from './components/User/UserSpaces';
import Billing from './components/User/Billing';
import Invoice from './components/User/Invoice';
import Checkout from './components/User/CheckOut';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createspace" element={<CreateSpace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/createuser' element={<CreateUser/>} />
        <Route path='/spaces' element={<Spaces/>} />
        <Route path='/users' element={<Users/>} />
        <Route path='/userspaces' element={<UserSpaces/>} />
        <Route path='/billing' element={<Billing/>} />
        <Route path='/invoice' element={<Invoice/>} />
        <Route path='/checkout' element={<Checkout/>} />
      </Routes>
    </div>
  );
};

export default App;
