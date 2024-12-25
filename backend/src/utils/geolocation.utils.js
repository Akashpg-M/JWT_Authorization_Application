// backend/utils/geolocationUtils.js
import geolib from 'geolib';

// Helper method to calculate distance between two locations
const calculateDistance = (location1, location2) => {
  return geolib.getDistance(
    { latitude: location1.lat, longitude: location1.lng },
    { latitude: location2.lat, longitude: location2.lng }
  );
};

export default { calculateDistance };
