import React from 'react';
import styles from './Button.module.css';

const Button = ({ 
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  rounded = false,
  uppercase = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  ...props
}) => {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    rounded && styles.rounded,
    uppercase && styles.uppercase,
    fullWidth && styles.fullWidth,
    loading && styles.loading,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className={styles.spinner} />}
      {!loading && leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
      <span className={styles.content}>{children}</span>
      {!loading && rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
    </button>
  );
};

export default Button;
