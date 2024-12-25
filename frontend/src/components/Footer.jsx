import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.footerText}>© 2024 FastMed. All rights reserved.</p>
      <p style={styles.footerText}>Contact us: support@fastmed.com</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerText: {
    margin: 5,
  },
};

export default Footer;
