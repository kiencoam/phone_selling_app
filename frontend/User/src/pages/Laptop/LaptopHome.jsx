import React, { useState, useEffect } from 'react';
import { useFilter } from '../../contexts/FilterContext';
import ProductGrid from '../../components/product/ProductGrid';
import LaptopFilter from './components/LaptopFilter';
import styles from './LaptopHome.module.css';

const LaptopHome = () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const { filters } = useFilter();

  // ... existing fetch logic ...

  return (
    <div className={styles.laptopPage}>
      <div className={styles.sidebar}>
        <LaptopFilter />
      </div>
      <div className={styles.content}>
        <h1>Laptop</h1>
        <ProductGrid products={laptops} loading={loading} />
      </div>
    </div>
  );
};

export default LaptopHome;
