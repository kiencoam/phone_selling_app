import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { Link } from 'react-router-dom';
import CategoryNav from '../components/CategoryNav';
import '../assets/styles/HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);
  const featuredProducts = products?.slice(0, 10) || [];  // Lấy 10 sản phẩm đầu tiên làm sản phẩm nổi bật
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Xử lý tự động trượt slider
  useEffect(() => {
    if (featuredProducts.length === 0) return;
    
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prevSlide) => 
          prevSlide >= Math.min(featuredProducts.length - 5, 5) ? 0 : prevSlide + 1
        );
      }, 5000); // Chuyển slide mỗi 5 giây
    };
    
    startAutoPlay();
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [featuredProducts.length]);
  
  // Cuộn slider khi currentSlide thay đổi
  useEffect(() => {
    if (sliderRef.current && featuredProducts.length > 0) {
      const cardWidth = sliderRef.current.querySelector('.product-card')?.offsetWidth || 0;
      const gap = 20; // Khoảng cách giữa các card
      sliderRef.current.scrollTo({
        left: currentSlide * (cardWidth + gap),
        behavior: 'smooth'
      });
    }
  }, [currentSlide]);
  
  // Di chuyển đến slide trước đó
  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide === 0 ? 0 : prevSlide - 1);
  };
  
  // Di chuyển đến slide tiếp theo
  const handleNextSlide = () => {
    const maxSlides = Math.max(0, featuredProducts.length - 5);
    setCurrentSlide((prevSlide) => prevSlide >= maxSlides ? 0 : prevSlide + 1);
  };

  if (loading) {
    return <div className="loading">Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div className="error">Có lỗi xảy ra: {error}</div>;
  }

  // Hàm xử lý hiển thị hình ảnh base64
  const renderProductImage = (product) => {
    if (product.image && product.image.base64) {
      // Hiển thị ảnh từ base64 string
      return `data:image/jpeg;base64,${product.image.base64}`;
    } else if (product.image && typeof product.image === 'string') {
      // Trường hợp image là URL
      return product.image;
    } else {
      // Fallback khi không có ảnh
      return 'https://via.placeholder.com/300x300?text=No+Image';
    }
  };

  // Tính giảm giá
  const calculateDiscount = (basePrice, salePrice) => {
    if (!basePrice || !salePrice || basePrice <= salePrice) return null;
    const discount = Math.round(((basePrice - salePrice) / basePrice) * 100);
    return discount > 0 ? `-${discount}%` : null;
  };

  return (
    <div className="home-container">
      <CategoryNav />
      <div className="featured-products">
        <h2>Sản phẩm nổi bật</h2>
        <div className="products-slider" ref={sliderRef}>
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              {product.basePrice > product.price && (
                <span className="discount-badge">
                  {calculateDiscount(product.basePrice, product.price)}
                </span>
              )}
              <div className="product-image">
                <img src={renderProductImage(product)} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <div className="product-rating">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`star ${index < Math.floor(product.rating || 0) ? 'filled' : ''}`}>★</span>
                ))}
                <span className="reviews-count">({product.reviewsCount || 0})</span>
              </div>
              <div className="product-prices">
                <p className="current-price">{(product.price || 0).toLocaleString('vi-VN')}đ</p>
                {product.basePrice > product.price && (
                  <p className="original-price">{(product.basePrice || 0).toLocaleString('vi-VN')}đ</p>
                )}
              </div>
              <div className="product-actions">
                <Link to={`/product/${product.id}`} className="view-details">
                  Chi tiết
                </Link>
                <button className="add-to-cart">Thêm vào giỏ</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="slider-controls">
          <button className="slider-button prev" onClick={handlePrevSlide}>&lt;</button>
          <button className="slider-button next" onClick={handleNextSlide}>&gt;</button>
        </div>
        
        <div className="slider-dots">
          {featuredProducts.slice(0, Math.min(featuredProducts.length - 4, 6)).map((_, index) => (
            <span 
              key={index} 
              className={`slider-dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
      
      <div className="categories-section">
        <h2>Tất cả sản phẩm</h2>
        <div className="products-grid">
          {products && products.map((product) => (
            <div key={product.id} className="product-card">
              {product.basePrice > product.price && (
                <span className="discount-badge">
                  {calculateDiscount(product.basePrice, product.price)}
                </span>
              )}
              <div className="product-image">
                <img src={renderProductImage(product)} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <div className="product-prices">
                <p className="current-price">{(product.price || 0).toLocaleString('vi-VN')}đ</p>
                {product.basePrice > product.price && (
                  <p className="original-price">{(product.basePrice || 0).toLocaleString('vi-VN')}đ</p>
                )}
              </div>
              <div className="product-rating">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`star ${index < Math.floor(product.rating || 0) ? 'filled' : ''}`}>★</span>
                ))}
                <span className="reviews-count">({product.reviewsCount || 0})</span>
              </div>
              <div className="product-actions">
                <Link to={`/product/${product.id}`} className="view-details">
                  Chi tiết
                </Link>
                <button className="add-to-cart">Thêm vào giỏ</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
