import React, { createContext, useState } from 'react';

const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <HospitalContext.Provider value={{ hospitals, setHospitals, loading, setLoading }}>
      {children}
    </HospitalContext.Provider>
  );
};

export default HospitalContext;
