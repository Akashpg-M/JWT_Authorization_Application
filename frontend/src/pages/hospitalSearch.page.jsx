import React, { useContext, useState } from 'react';
import HospitalContext from '../context/Hospital.context';
import { fetchManualHospitals, fetchFilteredHospitals } from '../services/hospitalService';
import useGeolocation from '../hooks/useGeolocation';
import HospitalCard from '../components/HospitalCard.components';

const SearchPage = () => {
  const { hospitals, setHospitals, loading, setLoading } = useContext(HospitalContext);
  const userLocation = useGeolocation();
  const [searchType, setSearchType] = useState('manual');
  const [hospitalName, setHospitalName] = useState('');
  const [illnessType, setIllnessType] = useState('');
  const [numberOfHospitals, setNumberOfHospitals] = useState(5);

  const handleManualSearch = async () => {
    setLoading(true);
    const data = await fetchManualHospitals(userLocation, hospitalName);
    setHospitals(data.hospitals);
    setLoading(false);
  };

  const handleFilteredSearch = async () => {
    setLoading(true);
    const data = await fetchFilteredHospitals(userLocation, illnessType, numberOfHospitals);
    setHospitals(data.hospitals);
    setLoading(false);
  };

  return (
    <div className="search-page">
      <h1>Search Hospitals</h1>
      <div>
        <label>
          Search Type:
          <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="manual">Manual</option>
            <option value="filtered">Filtered</option>
          </select>
        </label>
        {searchType === 'manual' && (
          <div>
            <label>
              Hospital Name:
              <input
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              />
            </label>
            <button onClick={handleManualSearch}>Search</button>
          </div>
        )}
        {searchType === 'filtered' && (
          <div>
            <label>
              Illness Type:
              <input
                type="text"
                value={illnessType}
                onChange={(e) => setIllnessType(e.target.value)}
              />
            </label>
            <label>
              Number of Hospitals:
              <select
                value={numberOfHospitals}
                onChange={(e) => setNumberOfHospitals(e.target.value)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </label>
            <button onClick={handleFilteredSearch}>Search</button>
          </div>
        )}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="hospital-list">
          {hospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
