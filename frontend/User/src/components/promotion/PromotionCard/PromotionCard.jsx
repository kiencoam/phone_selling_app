import React from 'react';
import styles from './PromotionCard.module.css';

const PromotionCard = ({ image, title, validUntil, description }) => {
  return (
    <div className={styles.promotionCard}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <span className={styles.validUntil}>Hết hạn: {validUntil}</span>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;
