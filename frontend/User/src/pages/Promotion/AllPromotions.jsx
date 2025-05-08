import React from 'react';
import { usePromotion } from '../../contexts/PromotionContext';
import PromotionCard from '../../components/promotion/PromotionCard/PromotionCard';
import FlashSale from '../../components/promotion/FlashSale/FlashSale';
import styles from './AllPromotions.module.css';

const AllPromotions = () => {
  const { activePromotions, flashSales, loading } = usePromotion();

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.promotionsPage}>
      <FlashSale data={flashSales} />
      <div className={styles.promotionGrid}>
        {activePromotions.map(promo => (
          <PromotionCard key={promo.id} promotion={promo} />
        ))}
      </div>
    </div>
  );
};

export default AllPromotions;
