import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import { useCart } from '../../hooks/useCart';
// ProductGallery from '../../components/product/ProductGallery';
//import ProductSpecifications from './ProductSpecifications';
//import ProductReviews from '../../components/product/ProductReviews';
//import AddToCartButton from '../../components/cart/AddToCartButton';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { productSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // ... existing fetch logic ...

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.productDetail}>
      <div className={styles.productMain}>
        <ProductGallery images={product.images} />
        <div className={styles.productInfo}>
          <h1>{product.name}</h1>
          <div className={styles.price}>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(product.price)}
          </div>
          <button 
            className={styles.addToCart}
            onClick={() => addToCart(product)}
          >
            MUA NGAY
          </button>
        </div>
      </div>
      <div className={styles.specifications}>
        <ProductSpecifications specs={product.specifications} />
      </div>
      <div className={styles.reviews}>
        <ProductReviews productId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetail;
