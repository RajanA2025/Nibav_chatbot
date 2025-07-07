import React from 'react';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2 style={styles.message}>Oops! Page Not Found</h2>
      <p style={styles.subtext}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/" style={styles.link}>🔙 Back to Home</a>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '5rem',
    fontFamily: 'Arial, sans-serif',
  },
  code: {
    fontSize: '6rem',
    color: '#ff4d4f',
  },
  message: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  subtext: {
    color: '#888',
    marginBottom: '2rem',
  },
  link: {
    textDecoration: 'none',
    color: '#1890ff',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
};

export default NotFound;
