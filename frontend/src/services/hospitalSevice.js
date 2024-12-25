const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const fetchManualHospitals = async (userLocation, hospitalName) => {
  const response = await fetch(`${API_BASE_URL}/api/hospitals/search/manual`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userLocation, hospitalName }),
  });
  return response.json();
};

export const fetchFilteredHospitals = async (userLocation, illnessType, numberOfHospitals) => {
  const response = await fetch(`${API_BASE_URL}/api/hospitals/search/filtered`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userLocation, illnessType, numberOfHospitals }),
  });
  return response.json();
};
