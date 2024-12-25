// backend/controllers/hospitalController.js
import googleMapsService from '../services/googleMaps.service.js';
import geolocationUtils from '../utils/geolocation.utils.js';

const searchHospitalsManual = async (req, res) => {
  const { userLocation, hospitalName } = req.body;  // userLocation { lat, lng }

  try {
    const hospitals = await googleMapsService.getHospitals(userLocation, hospitalName);
    
    // Sort hospitals by distance from user's location
    const hospitalsWithDistance = hospitals.map(hospital => ({
      ...hospital,
      distance: geolocationUtils.calculateDistance(userLocation, hospital.geometry.location)
    }));

    const sortedHospitals = hospitalsWithDistance.sort((a, b) => a.distance - b.distance);

    return res.json({
      hospitals: sortedHospitals
    });
  } catch (error) {
    console.error("Error searching hospitals:", error);
    return res.status(500).json({ message: "Error fetching hospital data" });
  }
};

const searchHospitalsFiltered = async (req, res) => {
  const { userLocation, illnessType, numberOfHospitals } = req.body;

  try {
    const hospitals = await googleMapsService.getHospitalsByIllnessType(userLocation, illnessType, numberOfHospitals);

    return res.json({
      hospitals
    });
  } catch (error) {
    console.error("Error searching hospitals:", error);
    return res.status(500).json({ message: "Error fetching hospital data" });
  }
};

export {
  searchHospitalsManual,
  searchHospitalsFiltered
};
