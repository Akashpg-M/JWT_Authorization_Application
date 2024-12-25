import React from 'react';
import { Link } from 'react-router-dom';  // Use Link to handle navigation

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/search" style={styles.navLink}>Hospital Search</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/chatbot" style={styles.navLink}>Chatbot</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/appointment" style={styles.navLink}>Appointments</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/pharmacy" style={styles.navLink}>Pharmacy</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px 20px',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    padding: 0,
    margin: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
  },
};

export default Navbar;
