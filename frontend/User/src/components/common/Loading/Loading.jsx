import React from 'react';
import styles from './Loading.module.css';

const Loading = ({ size = 'medium', overlay, text }) => {
  return (
    <div className={`${styles.loading} ${overlay ? styles.overlay : ''}`}>
      <div className={`${styles.spinner} ${styles[size]}`} />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default Loading;
