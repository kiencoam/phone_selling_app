import React, { useState } from 'react';
import styles from './ProductFilter.module.css';

const ProductFilter = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: '',
    brands: [],
    features: []
  });

  const priceRanges = [
    { id: 'under-2m', label: 'Dưới 2 triệu', value: [0, 2000000] },
    { id: '2m-4m', label: 'Từ 2 - 4 triệu', value: [2000000, 4000000] },
    { id: '4m-7m', label: 'Từ 4 - 7 triệu', value: [4000000, 7000000] },
    { id: '7m-13m', label: 'Từ 7 - 13 triệu', value: [7000000, 13000000] },
    { id: 'above-13m', label: 'Trên 13 triệu', value: [13000000, Infinity] }
  ];

  const brands = [
    'iPhone', 'Samsung', 'OPPO', 'Xiaomi', 'realme', 'vivo', 'Nokia'
  ];

  const features = [
    { id: '5g', label: 'Điện thoại 5G' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'pin', label: 'Pin trâu' },
    { id: 'camera', label: 'Camera chụp đẹp' }
  ];

  const handleFilterChange = (type, value) => {
    let newFilters;
    
    if (type === 'priceRange') {
      newFilters = { ...selectedFilters, priceRange: value };
    } else if (type === 'brands' || type === 'features') {
      const currentSelection = selectedFilters[type];
      newFilters = {
        ...selectedFilters,
        [type]: currentSelection.includes(value)
          ? currentSelection.filter(item => item !== value)
          : [...currentSelection, value]
      };
    }

    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      priceRange: '',
      brands: [],
      features: []
    };
    setSelectedFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterHeader}>
        <h3>Bộ lọc</h3>
        <button onClick={clearFilters} className={styles.clearButton}>
          Xóa tất cả
        </button>
      </div>

      <div className={styles.filterSection}>
        <h4>Giá</h4>
        {priceRanges.map(range => (
          <label key={range.id} className={styles.filterItem}>
            <input
              type="radio"
              name="priceRange"
              checked={selectedFilters.priceRange === range.id}
              onChange={() => handleFilterChange('priceRange', range.id)}
            />
            <span>{range.label}</span>
          </label>
        ))}
      </div>

      <div className={styles.filterSection}>
        <h4>Hãng</h4>
        <div className={styles.brandGrid}>
          {brands.map(brand => (
            <label key={brand} className={styles.brandItem}>
              <input
                type="checkbox"
                checked={selectedFilters.brands.includes(brand)}
                onChange={() => handleFilterChange('brands', brand)}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <h4>Tính năng đặc biệt</h4>
        {features.map(feature => (
          <label key={feature.id} className={styles.filterItem}>
            <input
              type="checkbox"
              checked={selectedFilters.features.includes(feature.id)}
              onChange={() => handleFilterChange('features', feature.id)}
            />
            <span>{feature.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
