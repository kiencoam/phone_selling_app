import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePromotion } from '../../contexts/PromotionContext';
import ProductGrid from '../../components/product/ProductGrid';
import PromotionCountdown from '../../components/promotion/PromotionCountdown';
import styles from './PromotionDetail.module.css';

const PromotionDetail = () => {
  const { promotionId } = useParams();
  const [promotion, setPromotion] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ... existing fetch logic ...

  return (
    <div className={styles.promotionDetail}>
      <div className={styles.promotionHeader}>
        <h1>{promotion.title}</h1>
        <PromotionCountdown endDate={promotion.endDate} />
      </div>
      <div className={styles.promotionContent}>
        <ProductGrid products={products} loading={loading} />
      </div>
    </div>
  );
};

export default PromotionDetail;
