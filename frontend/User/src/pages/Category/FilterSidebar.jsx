import React, { useState } from 'react';
import styles from './FilterSidebar.module.css';

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    priceRange: '',
    brands: [],
    colors: [],
    sortBy: 'newest'
  });

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters };
    
    if (filterType === 'brands' || filterType === 'colors') {
      const index = newFilters[filterType].indexOf(value);
      if (index === -1) {
        newFilters[filterType] = [...newFilters[filterType], value];
      } else {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      }
    } else {
      newFilters[filterType] = value;
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      priceRange: '',
      brands: [],
      colors: [],
      sortBy: 'newest'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Sắp xếp theo</h3>
        <div className={styles.sortOptions}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="sortBy"
              value="newest"
              checked={filters.sortBy === 'newest'}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            />
            <span>Mới nhất</span>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="sortBy"
              value="priceAsc"
              checked={filters.sortBy === 'priceAsc'}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            />
            <span>Giá tăng dần</span>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="sortBy"
              value="priceDesc"
              checked={filters.sortBy === 'priceDesc'}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            />
            <span>Giá giảm dần</span>
          </label>
        </div>
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Khoảng giá</h3>
        <div className={styles.priceRange}>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className={styles.select}
          >
            <option value="">Tất cả</option>
            <option value="0-5000000">Dưới 5 triệu</option>
            <option value="5000000-10000000">5 - 10 triệu</option>
            <option value="10000000-15000000">10 - 15 triệu</option>
            <option value="15000000-20000000">15 - 20 triệu</option>
            <option value="20000000-999999999">Trên 20 triệu</option>
          </select>
        </div>
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Thương hiệu</h3>
        <div className={styles.brandOptions}>
          {['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo'].map((brand) => (
            <label key={brand} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleFilterChange('brands', brand)}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Màu sắc</h3>
        <div className={styles.colorOptions}>
          {['Đen', 'Trắng', 'Xanh', 'Đỏ', 'Vàng'].map((color) => (
            <label key={color} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.colors.includes(color)}
                onChange={() => handleFilterChange('colors', color)}
              />
              <span>{color}</span>
            </label>
          ))}
        </div>
      </div>

      <button className={styles.clearButton} onClick={clearFilters}>
        Xóa bộ lọc
      </button>
    </div>
  );
};

export default FilterSidebar;
