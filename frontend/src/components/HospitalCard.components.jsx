// import React from 'react';

// const HospitalCard = ({ hospital }) => {
//   return (
//     <div className="hospital-card">
//       <h3>{hospital.name}</h3>
//       <p>{hospital.address}</p>
//       <p>Distance: {hospital.distance} meters</p>
//       <p>Specialties: {hospital.specialties.join(', ')}</p>
//       <p>Contact: {hospital.contact}</p>
//     </div>
//   );
// };

// export default HospitalCard;
import React from 'react';

// HospitalCard component to display details of each hospital
const HospitalCard = ({ hospital }) => {
  return (
    <div style={styles.card}>
      <div style={styles.cardContent}>
        <h3 style={styles.hospitalName}>{hospital.name}</h3>
        <p style={styles.address}><strong>Address:</strong> {hospital.address}</p>
        <p style={styles.specialties}><strong>Specialties:</strong> {hospital.specialties.join(', ')}</p>
        <p style={styles.contact}><strong>Contact:</strong> {hospital.contact}</p>
        
        {/* Optional: Display a map link or Google Maps location */}
        <a 
          href={`https://www.google.com/maps?q=${hospital.latitude},${hospital.longitude}`} 
          target="_blank" 
          rel="noopener noreferrer"
          style={styles.mapLink}
        >
          View on Google Maps
        </a>
      </div>
    </div>
  );
};

// Basic styling for the card component
const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '10px',
    padding: '15px',
    maxWidth: '300px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardContent: {
    padding: '10px',
  },
  hospitalName: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  address: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '10px',
  },
  specialties: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '10px',
  },
  contact: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '15px',
  },
  mapLink: {
    color: '#0066cc',
    textDecoration: 'none',
    fontSize: '14px',
  },
};

export default HospitalCard;
