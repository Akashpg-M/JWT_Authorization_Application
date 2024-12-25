import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';  // Import necessary routing components
import HomePage from './pages/HomePage';  // Import the Home page component
import SearchPage from './pages/SearchPage';  // Import Search page for hospital search
import ChatbotPage from './pages/ChatbotPage';  // Assuming you have a chatbot page
import AppointmentPage from './pages/AppointmentPage';  // Appointment page component
import PharmacyPage from './pages/PharmacyPage';  // Pharmacy page component

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<HomePage />} />  {/* Default route to HomePage */}
      <Route path="/search" element={<SearchPage />} />  {/* Hospital search route */}
      <Route path="/chatbot" element={<ChatbotPage />} />  {/* Chatbot page route */}
      <Route path="/appointment" element={<AppointmentPage />} />  {/* Appointment page route */}
      <Route path="/pharmacy" element={<PharmacyPage />} />  {/* Pharmacy page route */}
    </Switch>
  );
};

export default Routes;
