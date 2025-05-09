import React, { useState } from 'react';
import useCart from '../../../hooks/useCart';
import styles from './AddToCartButton.module.css';

const AddToCartButton = ({ product, className, variant = 'primary' }) => {
  const { addToCart, loading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);
  
  const handleAddToCart = async () => {
    try {
      await addToCart(product, quantity);
      setSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const buttonClass = variant === 'primary' 
    ? styles.primaryButton 
    : styles.secondaryButton;
  
  return (
    <div className={`${styles.addToCartContainer} ${className || ''}`}>
      <div className={styles.quantityControls}>
        <button 
          className={styles.quantityButton}
          onClick={decrementQuantity}
          disabled={quantity <= 1 || loading}
        >
          -
        </button>
        
        <input 
          type="number" 
          min="1" 
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className={styles.quantityInput}
          disabled={loading}
        />
        
        <button 
          className={styles.quantityButton}
          onClick={incrementQuantity}
          disabled={loading}
        >
          +
        </button>
      </div>
      
      <button 
        className={`${styles.addButton} ${buttonClass}`}
        onClick={handleAddToCart}
        disabled={loading}
      >
        {loading ? (
          <span className={styles.loadingSpinner}></span>
        ) : (
          <>
            <i className="fas fa-shopping-cart"></i>
            {success ? 'Đã thêm vào giỏ' : 'Thêm vào giỏ'}
          </>
        )}
      </button>
    </div>
  );
};

export default AddToCartButton; 