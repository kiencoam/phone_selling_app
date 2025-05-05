import React, { useState, useEffect } from 'react';
import styles from './Message.module.css';

const Message = ({ 
  type = 'info',
  title,
  message,
  onClose,
  autoClose = true,
  duration = 3000 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose && duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`${styles.message} ${styles[type]}`}>
      {title && <h4 className={styles.title}>{title}</h4>}
      <p className={styles.content}>{message}</p>
      {onClose && (
        <button onClick={onClose} className={styles.closeButton}>
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  );
};

export default Message;
