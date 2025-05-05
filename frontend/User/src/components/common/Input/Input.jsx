import React, { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  type = 'text',
  fullWidth = false,
  ...props
}, ref) => {
  return (
    <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      
      <div className={styles.inputWrapper}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        
        <input
          ref={ref}
          type={type}
          className={`${styles.input} ${error ? styles.error : ''}`}
          {...props}
        />
        
        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </div>

      {(error || helperText) && (
        <span className={`${styles.helperText} ${error ? styles.errorText : ''}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
});

export default Input;
