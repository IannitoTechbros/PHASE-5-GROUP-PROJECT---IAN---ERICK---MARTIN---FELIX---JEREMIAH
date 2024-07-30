import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Landing/Home';   // Updated path
import About from './components/Landing/About'; // Updated path
import Contact from './components/Landing/Contact'; // Updated path
import Login from './components/Landing/Login'; // Updated path
import Signup from './components/Landing/Signup'; // Updated path

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
