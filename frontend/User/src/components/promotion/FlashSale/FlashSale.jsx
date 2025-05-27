import React from 'react';
import { usePromotion } from '../../../contexts/PromotionContext';
import ProductCard from '../../product/ProductCard';
import styles from './FlashSale.module.css';
import PromotionCountdown from '../../product/PromotionCountdown';  // Đảm bảo đường dẫn đúng


const FlashSale = () => {
  const { flashSales, loading } = usePromotion();

  if (loading) return <div className={styles.skeleton} />;

  return (
    <div className={styles.flashSaleContainer}>
      <div className={styles.header}>
        <h2>Flash Sale 🔥</h2>
        <div className={styles.timer}>
          <PromotionCountdown endDate={flashSales.endTime} />
        </div>
      </div>
      
      <div className={styles.productsGrid}>
        {flashSales.products?.slice(0, 10).map(product => (
          <ProductCard 
            key={product.id}
            product={product}
            discountPrice={product.flashSalePrice}
            showTimer
          />
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
