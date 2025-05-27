import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import styles from './ProductList.module.css';

const ProductList = ({ products, loading }) => {
  const { addToCart, cartLoading } = useCart();

  if (loading) {
    return (
      <div className={styles.productGrid}>
        {[...Array(8)].map((_, index) => (
          <div key={index} className={styles.productCard}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonPrice} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <i className="fas fa-box-open"></i>
        <h3>Không tìm thấy sản phẩm</h3>
        <p>Vui lòng thử lại với bộ lọc khác</p>
      </div>
    );
  }

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <Link to={`/product/${product.slug}`} className={styles.productLink}>
            <div className={styles.productImage}>
              <img src={product.images[0]} alt={product.name} />
              {product.discount > 0 && (
                <span className={styles.discountBadge}>
                  -{product.discount}%
                </span>
              )}
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <div className={styles.productPrice}>
                {product.discount > 0 ? (
                  <>
                    <span className={styles.discountPrice}>
                      {product.discountPrice.toLocaleString('vi-VN')}đ
                    </span>
                    <span className={styles.originalPrice}>
                      {product.price.toLocaleString('vi-VN')}đ
                    </span>
                  </>
                ) : (
                  <span className={styles.currentPrice}>
                    {product.price.toLocaleString('vi-VN')}đ
                  </span>
                )}
              </div>
            </div>
          </Link>
          <button
            className={styles.addToCartButton}
            onClick={() => addToCart(product)}
            disabled={cartLoading}
          >
            {cartLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i className="fas fa-shopping-cart"></i>
            )}
            Thêm vào giỏ
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
