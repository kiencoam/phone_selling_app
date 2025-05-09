import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePromotion } from '../../contexts/PromotionContext';
import { ApiService } from '../../services/api';
import styles from './PromotionDetail.module.css';

const PromotionCountdown = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate) - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className={styles.countdown}>
      <div className={styles.timeUnit}>
        <span className={styles.timeValue}>{timeLeft.days}</span>
        <span className={styles.timeLabel}>ngày</span>
      </div>
      <div className={styles.timeUnit}>
        <span className={styles.timeValue}>{timeLeft.hours}</span>
        <span className={styles.timeLabel}>giờ</span>
      </div>
      <div className={styles.timeUnit}>
        <span className={styles.timeValue}>{timeLeft.minutes}</span>
        <span className={styles.timeLabel}>phút</span>
      </div>
      <div className={styles.timeUnit}>
        <span className={styles.timeValue}>{timeLeft.seconds}</span>
        <span className={styles.timeLabel}>giây</span>
      </div>
    </div>
  );
};

const ProductItem = ({ product }) => {
  return (
    <div className={styles.productItem}>
      <div className={styles.productImage}>
        <img src={product.imageUrl} alt={product.name} />
        {product.discountPrice && (
          <div className={styles.discountBadge}>
            -{Math.round((1 - product.discountPrice / product.price) * 100)}%
          </div>
        )}
      </div>
      <h3 className={styles.productTitle}>{product.name}</h3>
      <div className={styles.productPrice}>
        {product.discountPrice ? (
          <>
            <span className={styles.salePrice}>
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
          </>
        ) : (
          <span className={styles.salePrice}>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
              maximumFractionDigits: 0
            }).format(product.price)}
          </span>
        )}
      </div>
      <button className={styles.addToCartButton}>
        Thêm vào giỏ
      </button>
    </div>
  );
};

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return <div className={styles.loading}>Đang tải...</div>;
  }

  if (!products || products.length === 0) {
    return <div className={styles.noProducts}>Không có sản phẩm nào</div>;
  }

  return (
    <div className={styles.productGrid}>
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

const PromotionDetail = () => {
  const { promoId } = useParams();
  const [promotion, setPromotion] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotion = async () => {
      setLoading(true);
      try {
        // Fetch promotion details
        const promoData = await ApiService.fetchPromotionById(promoId);
        setPromotion(promoData);
        
        // Fetch products for this promotion
        const productsData = await ApiService.fetchProducts({
          promotion: promoId
        });
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching promotion details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (promoId) {
      fetchPromotion();
    }
  }, [promoId]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!promotion) {
    return (
      <div className={styles.notFound}>
        <h2>Không tìm thấy khuyến mãi</h2>
        <p>Khuyến mãi này không tồn tại hoặc đã kết thúc.</p>
      </div>
    );
  }

  return (
    <div className={styles.promotionDetail}>
      <div className={styles.promotionHeader}>
        <h1>{promotion.title}</h1>
        <p className={styles.promotionDescription}>{promotion.description}</p>
        <PromotionCountdown endDate={promotion.endDate} />
      </div>
      
      <div className={styles.promotionContent}>
        <h2>Sản phẩm trong chương trình</h2>
        <ProductGrid products={products} loading={false} />
      </div>
    </div>
  );
};

export default PromotionDetail;
