import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './HeroBanner.module.css';

const HeroBanner = ({ banners = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-rotate banners
  useEffect(() => {
    if (banners.length <= 1) return;
    
    const intervalId = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, [banners.length]);
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  const goToPrevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + banners.length) % banners.length);
  };
  
  const goToNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % banners.length);
  };
  
  if (!banners.length) {
    return (
      <div className={styles.emptyBanner}>
        <div className={styles.emptyBannerPlaceholder}></div>
      </div>
    );
  }

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerWrapper}>
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`${styles.bannerSlide} ${index === currentSlide ? styles.active : ''}`}
            style={{ transform: `translateX(${100 * (index - currentSlide)}%)` }}
          >
            <Link to={banner.link || '#'}>
              <img 
                src={banner.imageUrl} 
                alt={banner.title} 
                className={styles.bannerImage} 
              />
            </Link>
          </div>
        ))}
      </div>
      
      {banners.length > 1 && (
        <>
          <button 
            className={`${styles.bannerControl} ${styles.prevControl}`}
            onClick={goToPrevSlide}
            aria-label="Previous banner"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <button 
            className={`${styles.bannerControl} ${styles.nextControl}`}
            onClick={goToNextSlide}
            aria-label="Next banner"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div className={styles.bannerDots}>
            {banners.map((_, index) => (
              <button
                key={index}
                className={`${styles.bannerDot} ${index === currentSlide ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroBanner; 