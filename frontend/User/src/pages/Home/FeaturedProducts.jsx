import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import styles from './FeaturedProducts.module.css';

const FeaturedProducts = ({ products = [] }) => {
  const { addToCart, loading } = useCart();
  
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
      {products.map(product => {
        // Đảm bảo tương thích với dữ liệu API và dữ liệu mẫu
        const productId = product.id || product.productId;
        const productName = product.name || product.productName;
        const productImage = product.imageUrl || product.image || '';
        const productPrice = product.price || 0;
        const productDiscountPrice = product.discountPrice || product.salePrice;
        const productRating = product.rating || 5;
        const productReviewCount = product.reviewCount || 0;
        
        return (
          <div key={productId} className={styles.productCard}>
            <Link to={`/product/${productId}`} className={styles.productLink}>
              <div className={styles.productImageWrapper}>
                <img 
                  src={productImage} 
                  alt={productName} 
                  className={styles.productImage} 
                />
                
                {productDiscountPrice && productDiscountPrice < productPrice && (
                  <div className={styles.discountBadge}>
                    -{Math.round((1 - productDiscountPrice / productPrice) * 100)}%
                  </div>
                )}
              </div>
              
              <h3 className={styles.productName}>{productName}</h3>
              
              <div className={styles.productPriceWrapper}>
                {productDiscountPrice && productDiscountPrice < productPrice ? (
                  <>
                    <span className={styles.productPrice}>
                      {formatPrice(productDiscountPrice)}
                    </span>
                    <span className={styles.productPriceOriginal}>
                      {formatPrice(productPrice)}
                    </span>
                  </>
                ) : (
                  <span className={styles.productPrice}>
                    {formatPrice(productPrice)}
                  </span>
                )}
              </div>
              
              <div className={styles.productRating}>
                <div className={styles.ratingStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i 
                      key={star} 
                      className={`fas fa-star ${star <= Math.round(productRating) ? styles.filled : ''}`}
                    ></i>
                  ))}
                </div>
                <span className={styles.reviewCount}>
                  {productReviewCount} đánh giá
                </span>
              </div>
            </Link>
            
            <button 
              className={styles.addToCartBtn}
              onClick={() => addToCart(product)}
              disabled={loading}
            >
              <i className="fas fa-shopping-cart"></i> Thêm vào giỏ
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedProducts; 