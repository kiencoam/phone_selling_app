import React from 'react';
import { useFilter } from '../../../../contexts/FilterContext';
import styles from './LaptopFilter.module.css';

const LaptopFilter = () => {
  const { filters, updateFilters } = useFilter();

  const handlePriceRangeChange = (e) => {
    updateFilters({ priceRange: e.target.value });
  };

  const handleBrandChange = (e) => {
    updateFilters({ brand: e.target.value });
  };

  return (
    <div className={styles.filterContainer}>
      <h2>Filters</h2>
      
      <div className={styles.filterSection}>
        <h3>Price Range</h3>
        <select onChange={handlePriceRangeChange} value={filters.priceRange}>
          <option value="">All Prices</option>
          <option value="0-500">Under $500</option>
          <option value="500-1000">$500 - $1000</option>
          <option value="1000-1500">$1000 - $1500</option>
          <option value="1500+">Over $1500</option>
        </select>
      </div>

      <div className={styles.filterSection}>
        <h3>Brand</h3>
        <select onChange={handleBrandChange} value={filters.brand}>
          <option value="">All Brands</option>
          <option value="apple">Apple</option>
          <option value="dell">Dell</option>
          <option value="hp">HP</option>
          <option value="lenovo">Lenovo</option>
          <option value="asus">Asus</option>
        </select>
      </div>
    </div>
  );
};

export default LaptopFilter;
