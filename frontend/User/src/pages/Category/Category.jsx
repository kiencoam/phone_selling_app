import React, { useState } from 'react';
import styles from './Category.module.css';
import FilterSidebar from './FilterSidebar';
import ProductList from './ProductList';

const Category = () => {
  const [filters, setFilters] = useState({
    priceRange: '',
    brands: [],
    features: []
  });

  // Temporary mock data - replace with API call
  const products = [
    { 
      id: 1, 
      image: '/assets/images/phone1.jpg', 
      name: 'iPhone 14 Pro', 
      price: 25000000, 
      discountPrice: 23000000, 
      rating: 4.5, 
      reviewCount: 120, 
      isNew: true, 
      promotion: 'Sale' 
    },
    { 
      id: 2, 
      image: '/assets/images/phone2.jpg', 
      name: 'Samsung Galaxy S23', 
      price: 20000000, 
      rating: 4.0, 
      reviewCount: 80 
    }
  ];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Add API call here to fetch filtered products
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <FilterSidebar onFilterChange={handleFilterChange} />
        </aside>
        <main className={styles.main}>
          <ProductList products={products} />
        </main>
      </div>
    </div>
  );
};

export default Category;
