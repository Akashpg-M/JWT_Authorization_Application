import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HospitalProvider } from './context/HospitalContext';  // Import HospitalContext
import Navbar from './components/Navbar';  // Assuming you have a Navbar component
import Footer from './components/Footer';  // Assuming you have a Footer component
import Routes from './routes';  // Import routing definitions

import './App.css';  // Assuming you have global styles

const App = () => {
  return (
    <HospitalProvider>  {/* Wrap the application in the HospitalContext provider */}
      <Router>  {/* React Router for handling page navigation */}
        <Navbar />
        <Routes />  {/* This will handle the different page routes */}
        <Footer />
      </Router>
    </HospitalProvider>
  );
};

export default App;
