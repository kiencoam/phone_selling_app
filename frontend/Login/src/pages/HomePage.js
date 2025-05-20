import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { Link } from 'react-router-dom';
import '../assets/styles/HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div className="loading">Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div className="error">Có lỗi xảy ra: {error}</div>;
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Chào mừng đến với cửa hàng công nghệ</h1>
        <p>Khám phá các sản phẩm công nghệ tốt nhất với giá cả hợp lý</p>
      </div>
      
      <div className="featured-products">
        <h2>Sản phẩm nổi bật</h2>
        <div className="products-grid">
          {products && products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">{product.price.toLocaleString('vi-VN')}đ</p>
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
      
      <div className="categories-section">
        <h2>Danh mục sản phẩm</h2>
        <div className="categories-grid">
          {/* Danh mục sản phẩm sẽ được thêm sau */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
