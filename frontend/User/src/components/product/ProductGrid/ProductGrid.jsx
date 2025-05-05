import React from 'react';
import ProductCard from '../ProductCard';
import styles from './ProductGrid.module.css';

const ProductGrid = ({ products }) => {
  return (
    <div className={styles.grid}>
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;
