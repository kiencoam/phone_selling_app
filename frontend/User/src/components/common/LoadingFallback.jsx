import React from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    padding: '2rem',
    textAlign: 'center',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderTopColor: '#3182ce',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.1rem',
    color: '#4a5568',
  },
};

// Áp dụng animation cho spinner
const keyframesStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingFallback = ({ message = 'Đang tải dữ liệu...' }) => {
  return (
    <div style={styles.container}>
      <style>{keyframesStyle}</style>
      <div style={styles.spinner}></div>
      <p style={styles.message}>{message}</p>
    </div>
  );
};

export default LoadingFallback; 