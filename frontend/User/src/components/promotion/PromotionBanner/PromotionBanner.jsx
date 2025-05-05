import React from 'react';
import { Link } from 'react-router-dom';
import { usePromotion } from '../../../contexts/PromotionContext';
import styles from './PromotionBanner.module.css';

const PromotionBanner = () => {
  const { activePromotions, loading } = usePromotion();

  if (loading) return <div className={styles.skeleton} />;

  return (
    <div className={styles.bannerContainer}>
      {activePromotions.map((promo) => (
        <Link 
          key={promo.id}
          to={`/promotion/${promo.id}`}
          className={styles.bannerLink}
        >
          <div className={styles.bannerContent}>
            <img src={promo.bannerImage} alt={promo.title} />
            <div className={styles.bannerInfo}>
              <h3>{promo.title}</h3>
              <p>{promo.description}</p>
              {promo.endDate && (
                <div className={styles.countdown}>
                  Kết thúc trong: <PromotionCountdown endDate={promo.endDate} />
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PromotionBanner;
