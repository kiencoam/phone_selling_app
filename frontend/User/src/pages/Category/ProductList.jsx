import React from 'react';
import ProductGrid from '../../components/product/ProductGrid';
import styles from './Category.module.css';

const ProductList = ({ products }) => {
  return (
    <div className={styles.productList}>
      <div className={styles.productHeader}>
        <h1>Điện thoại</h1>
        <div className={styles.sortOptions}>
          {/* Add sort options here */}
        </div>
      </div>
      <ProductGrid products={products} />
    </div>
  );
};

export default ProductList;
