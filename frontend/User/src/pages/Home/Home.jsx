import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiService } from '../../services/api.service';
import HeroBanner from './HeroBanner';
import FeaturedProducts from './FeaturedProducts';
import styles from './Home.module.css';

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [phoneProducts, setPhoneProducts] = useState([]);
  const [laptopProducts, setLaptopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        // Fetch banners and products in parallel
        const [bannersData, productsData] = await Promise.all([
          ApiService.fetchBanners(),
          ApiService.fetchProducts(),
        ]);

        setBanners(bannersData);
        
        // Featured products (first 6)
        setFeaturedProducts(productsData.slice(0, 6));
        
        // Phone products
        setPhoneProducts(productsData.filter(p => p.categoryId === 'phone').slice(0, 4));
        
        // Laptop products
        setLaptopProducts(productsData.filter(p => p.categoryId === 'laptop').slice(0, 4));
      } catch (err) {
        console.error('Error fetching home data:', err);
        setError('Failed to load home data. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
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

  return (
    <div className={styles.homePage}>
      <HeroBanner banners={banners} />
      
      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Sản phẩm nổi bật</h2>
          <Link to="/products" className={styles.viewAllLink}>
            Xem tất cả <i className="fas fa-chevron-right"></i>
          </Link>
        </div>
        <FeaturedProducts products={featuredProducts} />
      </section>
      
      <section className={styles.categorySection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Điện thoại hot</h2>
          <Link to="/phone" className={styles.viewAllLink}>
            Xem tất cả <i className="fas fa-chevron-right"></i>
          </Link>
        </div>
        <FeaturedProducts products={phoneProducts} />
      </section>
      
      <section className={styles.categorySection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Laptop đáng mua</h2>
          <Link to="/laptop" className={styles.viewAllLink}>
            Xem tất cả <i className="fas fa-chevron-right"></i>
          </Link>
        </div>
        <FeaturedProducts products={laptopProducts} />
      </section>
    </div>
  );
};

export default Home; 