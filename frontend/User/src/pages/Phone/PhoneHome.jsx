import React, { useState, useEffect } from 'react';
import { useFilter } from '../../contexts/FilterContext';
import ProductGrid from '../../components/product/ProductGrid';
import PhoneFilter from './components/PhoneFilter';
import styles from './PhoneHome.module.css';

const PhoneHome = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const { filters } = useFilter();

  // ... existing fetch logic ...

  return (
    <div className={styles.phonePage}>
      <div className={styles.sidebar}>
        <PhoneFilter />
      </div>
      <div className={styles.content}>
        <h1>Điện thoại</h1>
        <ProductGrid products={phones} loading={loading} />
      </div>
    </div>
  );
};

export default PhoneHome;
