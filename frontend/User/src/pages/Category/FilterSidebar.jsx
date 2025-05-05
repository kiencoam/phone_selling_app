import React from 'react';
import ProductFilter from '../../components/product/ProductFilter';
import styles from './Category.module.css';

const FilterSidebar = ({ onFilterChange }) => {
  return (
    <div className={styles.filterWrapper}>
      <ProductFilter onFilterChange={onFilterChange} />
    </div>
  );
};

export default FilterSidebar;
