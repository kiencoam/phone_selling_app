import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import styles from './FeaturedProducts.module.css';

const FeaturedProducts = ({ products = [] }) => {
  const { addToCart, loading } = useCart();
  
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product, 1);
  };
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  if (!products.length) {
    return (
      <div className={styles.emptyProducts}>
        <p>Không có sản phẩm nào</p>
      </div>
    );
  }

  return (
    <div className={styles.productsGrid}>
      {products.map(product => (
        <div key={product.id} className={styles.productCard}>
          <Link to={`/product/${product.id}`} className={styles.productLink}>
            <div className={styles.productImageWrapper}>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className={styles.productImage} 
              />
              
              {product.discountPrice && (
                <div className={styles.discountBadge}>
                  -{Math.round((1 - product.discountPrice / product.price) * 100)}%
                </div>
              )}
            </div>
            
            <h3 className={styles.productName}>{product.name}</h3>
            
            <div className={styles.productPriceWrapper}>
              {product.discountPrice ? (
                <>
                  <span className={styles.productPrice}>
                    {formatPrice(product.discountPrice)}
                  </span>
                  <span className={styles.productPriceOriginal}>
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className={styles.productPrice}>
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            
            <div className={styles.productRating}>
              <div className={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <i 
                    key={star} 
                    className={`fas fa-star ${star <= Math.round(product.rating) ? styles.filled : ''}`}
                  ></i>
                ))}
              </div>
              <span className={styles.reviewCount}>
                {product.reviewCount} đánh giá
              </span>
            </div>
          </Link>
          
          <button 
            className={styles.addToCartButton}
            onClick={(e) => handleAddToCart(e, product)}
            disabled={loading}
          >
            <i className="fas fa-shopping-cart"></i>
            Thêm vào giỏ
          </button>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts; 