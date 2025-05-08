import React, { useState, useEffect } from 'react';
import { useFilter } from '../../contexts/FilterContext';
import ProductGrid from '../../components/product/ProductGrid';
import ProductFilter from '../../components/product/ProductFilter/ProductFilter';
import PromotionBanner from '../../components/promotion/PromotionBanner/PromotionBanner';
import styles from './PhoneHome.module.css';

const PhoneHome = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const { filters } = useFilter();

  // ... existing fetch logic ...

  return (
    <div className={styles.phonePage}>
      <PhoneBanner />
      <div className={styles.mainContent}>
        <div className={styles.filterSection}>
          <PhoneFilter />
        </div>
        <div className={styles.productSection}>
          <div className={styles.filterTags}>
            {/* Filter tags will be added here */}
          </div>
          <ProductGrid products={phones} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default PhoneHome;
