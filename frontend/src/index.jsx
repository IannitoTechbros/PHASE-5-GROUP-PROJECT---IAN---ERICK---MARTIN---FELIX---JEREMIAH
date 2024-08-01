import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated for React 18
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/main.css'; // Correct path if main.css is inside src/assets/styles/
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
