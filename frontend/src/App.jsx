import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './components/Landing/Home';
import About from './components/Landing/About';
import Contact from './components/Landing/Contact';
import Login from './components/Landing/Login';
import Signup from './components/Landing/Signup';
import CreateSpace from './components/Admin/CreateSpace';
import Dashboard from './components/Admin/Dashboard';
import CreateUser from './components/Admin/CreateUser';
import Spaces from './components/Admin/Spaces';
import Users from './components/Admin/Users';
import UserSpaces from './components/User/UserSpaces';
import Billing from './components/User/Billing';
import Invoice from './components/User/Invoice';
import Checkout from './components/User/CheckOut';
import UpdateSpace from './components/Admin/UpdateSpace';

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
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/users" element={<Users />} />
        <Route path="/userspaces" element={<UserSpaces />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/updatespace/:id" element={<UpdateSpace />} />
      </Routes>
    </div>
  );
};

export default App;
