import React from 'react';
import styles from './Input.module.css';

const Input = ({
  label,
  error,
  icon,
  type = 'text',
  className,
  ...props
}) => {
  const inputClasses = [
    styles.input,
    error && styles.error,
    icon && styles.withIcon,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input type={type} className={inputClasses} {...props} />
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;
