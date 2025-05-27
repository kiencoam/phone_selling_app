import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiService } from '../../services/api';
import useCart from '../../hooks/useCart';
import ProductGallery from '../../components/product/ProductGallery';
import ProductSpecifications from './ProductSpecifications';
import ProductReviews from '../../components/product/ProductReviews';
import LoadingFallback from '../../components/common/LoadingFallback';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, loading: cartLoading } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      console.log('[ProductDetail] fetchProductDetails - start', { productId });
      setLoading(true);
      try {
        const productData = await ApiService.fetchProductDetails(productId);
        console.log('[ProductDetail] Product details fetched successfully');
        setProduct(productData);
        setError(null);
      } catch (err) {
        console.error('[ProductDetail] Error fetching product details:', err);
        setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product);
    } catch (err) {
      console.error('[ProductDetail] Error adding to cart:', err);
    }
  };

  if (loading) {
    return <LoadingFallback message="Đang tải thông tin sản phẩm..." />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className={styles.refreshButton}
        >
          Tải lại trang
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Sản phẩm không tồn tại</h2>
        <p>Không tìm thấy thông tin sản phẩm này.</p>
      </div>
    );
  }

  return (
    <div className={styles.productDetail}>
      <div className={styles.productMain}>
        <ProductGallery images={product.images} />
        <div className={styles.productInfo}>
          <h1>{product.name}</h1>
          
          <div className={styles.rating}>
            <div className={styles.stars}>
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

          <div className={styles.price}>
            {product.discountPrice ? (
              <>
                <span className={styles.discountPrice}>
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    maximumFractionDigits: 0
                  }).format(product.discountPrice)}
                </span>
                <span className={styles.originalPrice}>
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    maximumFractionDigits: 0
                  }).format(product.price)}
                </span>
                <span className={styles.discountPercent}>
                  -{Math.round((1 - product.discountPrice / product.price) * 100)}%
                </span>
              </>
            ) : (
              <span className={styles.currentPrice}>
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                  maximumFractionDigits: 0
                }).format(product.price)}
              </span>
            )}
          </div>

          <div className={styles.description}>
            <h3>Mô tả sản phẩm</h3>
            <p>{product.description}</p>
          </div>

          <div className={styles.colors}>
            <h3>Màu sắc</h3>
            <div className={styles.colorOptions}>
              {product.colors.map((color) => (
                <button 
                  key={color}
                  className={styles.colorOption}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button 
              className={styles.addToCart}
              onClick={handleAddToCart}
              disabled={cartLoading}
            >
              {cartLoading ? 'Đang thêm...' : 'MUA NGAY'}
            </button>
            <button className={styles.addToWishlist}>
              <i className="far fa-heart"></i>
              Yêu thích
            </button>
          </div>

          <div className={styles.policy}>
            <div className={styles.policyItem}>
              <i className="fas fa-shield-alt"></i>
              <span>Bảo hành {product.warranty}</span>
            </div>
            <div className={styles.policyItem}>
              <i className="fas fa-truck"></i>
              <span>Miễn phí vận chuyển</span>
            </div>
            <div className={styles.policyItem}>
              <i className="fas fa-undo"></i>
              <span>Đổi trả trong 30 ngày</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.productTabs}>
        <div className={styles.tabContent}>
          <ProductSpecifications specs={product.specifications} />
        </div>
        <div className={styles.tabContent}>
          <ProductReviews reviews={product.reviews} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
