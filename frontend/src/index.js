import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Global CSS (if needed)
import App from './App';  // Import the main App component

// Render the App component into the root div in the index.html file
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // Ensure this matches the root element in index.html
);
