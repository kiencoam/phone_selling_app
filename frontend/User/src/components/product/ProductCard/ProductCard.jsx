import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

const ProductCard = ({ id, image, name, price, discountPrice, rating, reviewCount, isNew, promotion, onAddToCart }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      if (onAddToCart) {
        await onAddToCart(id);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      {isNew && <span className={styles.newBadge}>Mới</span>}
      {promotion && <span className={styles.promotionBadge}>{promotion}</span>}
      
      <Link to={`/product/${id}`}>
        <img src={image} alt={name} className={styles.image} />
      </Link>
      
      <h3 className={styles.title}>{name}</h3>
      
      <div className={styles.rating}>
        <span className={styles.stars}>
          {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
        </span>
        <span className={styles.reviewCount}>({reviewCount})</span>
      </div>
      
      <div className={styles.priceContainer}>
        {discountPrice ? (
          <>
            <span className={styles.originalPrice}>{price.toLocaleString('vi-VN')}₫</span>
            <span className={styles.discountPrice}>{discountPrice.toLocaleString('vi-VN')}₫</span>
          </>
        ) : (
          <span className={styles.price}>{price.toLocaleString('vi-VN')}₫</span>
        )}
      </div>

      <button 
        className={`${styles.addToCartButton} ${isLoading ? styles.loading : ''}`}
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        {isLoading ? 'Đang thêm...' : 'Thêm vào giỏ'}
      </button>
    </div>
  );
};

export default ProductCard;