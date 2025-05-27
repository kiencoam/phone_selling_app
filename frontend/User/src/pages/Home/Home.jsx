import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiService } from '../../services/api';
import HeroBanner from './HeroBanner';
import FeaturedProducts from './FeaturedProducts';
import LoadingFallback from '../../components/common/LoadingFallback';
import styles from './Home.module.css';

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [phoneProducts, setPhoneProducts] = useState([]);
  const [laptopProducts, setLaptopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Log khi component được mount
  useEffect(() => {
    console.log('[Home] Component mounted');
    return () => {
      console.log('[Home] Component unmounted');
    };
  }, []);

  useEffect(() => {
    const fetchHomeData = async () => {
      console.log('[Home] fetchHomeData - start');
      setLoading(true);
      try {
        // Bắt riêng từng lỗi API để không ảnh hưởng đến toàn bộ trang
        let bannersData = [];
        let featuredData = [];
        let hotPhonesData = [];
        
        try {
          console.log('[Home] Fetching banners');
          bannersData = await ApiService.fetchBanners();
          console.log('[Home] Banners fetched successfully', { count: bannersData.length });
        } catch (err) {
          console.error('[Home] Error fetching banners:', err);
        }
        
        try {
          console.log('[Home] Fetching featured products');
          featuredData = await ApiService.fetchFeaturedProducts();
          console.log('[Home] Featured products fetched successfully', { count: featuredData.length });
        } catch (err) {
          console.error('[Home] Error fetching featured products:', err);
        }
        
        try {
          console.log('[Home] Fetching hot phones');
          hotPhonesData = await ApiService.fetchHotPhones();
          console.log('[Home] Hot phones fetched successfully', { count: hotPhonesData.length });
        } catch (err) {
          console.error('[Home] Error fetching hot phones:', err);
        }

        console.log('[Home] Setting state with fetched data');
        setBanners(bannersData || []);
        setFeaturedProducts(featuredData || []);
        setPhoneProducts(hotPhonesData || []);
        
        // Laptop products
        const laptops = (featuredData || []).filter(p => p.categoryId === 'laptop').slice(0, 4);
        console.log('[Home] Filtered laptop products', { count: laptops.length });
        setLaptopProducts(laptops);
        
        setLoading(false);
        console.log('[Home] fetchHomeData - complete');
      } catch (err) {
        console.error('[Home] Critical error in fetchHomeData:', err);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Log khi loading hoặc error thay đổi
  useEffect(() => {
    console.log('[Home] State updated', { loading, hasError: !!error });
  }, [loading, error]);

  if (loading) {
    console.log('[Home] Rendering loading state');
    return <LoadingFallback message="Đang tải dữ liệu trang chủ..." />;
  }

  if (error) {
    console.log('[Home] Rendering error state', { error });
    return (
      <div className={styles.errorContainer}>
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
        <button 
          onClick={() => {
            console.log('[Home] Reload button clicked');
            window.location.reload();
          }}
          className={styles.refreshButton}
        >
          Tải lại trang
        </button>
      </div>
    );
  }

  console.log('[Home] Rendering content', {
    hasBanners: banners.length > 0,
    hasFeaturedProducts: featuredProducts.length > 0,
    hasPhoneProducts: phoneProducts.length > 0,
    hasLaptopProducts: laptopProducts.length > 0
  });

  return (
    <div className={styles.homePage}>
      {banners && banners.length > 0 && <HeroBanner banners={banners} />}
      
      {featuredProducts && featuredProducts.length > 0 && (
        <section className={styles.featuredSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Sản phẩm nổi bật</h2>
            <Link to="/products" className={styles.viewAllLink}>
              Xem tất cả <i className="fas fa-chevron-right"></i>
            </Link>
          </div>
          <FeaturedProducts products={featuredProducts} />
        </section>
      )}
      
      {phoneProducts && phoneProducts.length > 0 && (
        <section className={styles.categorySection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Điện thoại hot</h2>
            <Link to="/phone" className={styles.viewAllLink}>
              Xem tất cả <i className="fas fa-chevron-right"></i>
            </Link>
          </div>
          <FeaturedProducts products={phoneProducts} />
        </section>
      )}
      
      {laptopProducts && laptopProducts.length > 0 && (
        <section className={styles.categorySection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Laptop đáng mua</h2>
            <Link to="/laptop" className={styles.viewAllLink}>
              Xem tất cả <i className="fas fa-chevron-right"></i>
            </Link>
          </div>
          <FeaturedProducts products={laptopProducts} />
        </section>
      )}
    </div>
  );
};

export default Home; 