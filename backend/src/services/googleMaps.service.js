// backend/services/googleMapsService.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

// Helper function to fetch hospitals from Google Places API
const getHospitals = async (userLocation, hospitalName = '') => {
  const { lat, lng } = userLocation;
  const radius = 5000;  // 5 km radius for search

  // Construct the API URL for Google Places
  const url = `${BASE_URL}?location=${lat},${lng}&radius=${radius}&type=hospital&keyword=${hospitalName}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch hospitals from Google Maps API');
  }
};

// Function to fetch hospitals based on illness type and distance
const getHospitalsByIllnessType = async (userLocation, illnessType, numberOfHospitals = 5) => {
  const hospitals = await getHospitals(userLocation, illnessType);
  // Return the required number of hospitals based on distance
  return hospitals.slice(0, numberOfHospitals);
};

export default {
  getHospitals,
  getHospitalsByIllnessType
};
