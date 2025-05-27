import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import styles from './FeaturedProducts.module.css';

const FeaturedProducts = ({ products = [], loading = false, error = null }) => {
  const { addToCart, loading: cartLoading } = useCart();
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  if (loading) {
    return (
      <div className={styles.loadingGrid}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className={styles.productCardSkeleton}>
            <div className={styles.imageSkeleton} />
            <div className={styles.contentSkeleton}>
              <div className={styles.titleSkeleton} />
              <div className={styles.priceSkeleton} />
              <div className={styles.ratingSkeleton} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
      </div>
    );
  }
  
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
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/images/placeholder.png';
                  }}
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
              disabled={cartLoading}
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