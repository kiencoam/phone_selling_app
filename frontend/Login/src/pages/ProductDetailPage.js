import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/slices/productSlice';
import '../assets/styles/ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector((state) => state.products);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(productId));
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [dispatch, productId]);

  if (loading) {
    return <div className="loading-container"><div className="loading">Đang tải thông tin sản phẩm...</div></div>;
  }

  if (error) {
    return <div className="error-container"><div className="error">Có lỗi xảy ra: {error}</div></div>;
  }

  if (!currentProduct) {
    return <div className="error-container"><div className="error">Không tìm thấy sản phẩm</div></div>;
  }

  // Xử lý hiển thị hình ảnh từ base64
  const renderProductImage = () => {
    if (currentProduct.image && currentProduct.image.base64) {
      return `data:image/jpeg;base64,${currentProduct.image.base64}`;
    } else if (currentProduct.image && typeof currentProduct.image === 'string') {
      return currentProduct.image;
    } else {
      return 'https://via.placeholder.com/500x500?text=No+Image';
    }
  };

  // Tính giảm giá
  const calculateDiscount = () => {
    if (!currentProduct.basePrice || !currentProduct.price || currentProduct.basePrice <= currentProduct.price) return null;
    const discount = Math.round(((currentProduct.basePrice - currentProduct.price) / currentProduct.basePrice) * 100);
    return discount > 0 ? `${discount}%` : null;
  };

  // Format giá tiền
  const formatCurrency = (price) => {
    return price?.toLocaleString('vi-VN') + 'đ';
  };

  // Format ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    // Sẽ thêm chức năng thêm vào giỏ hàng sau
    alert(`Đã thêm ${quantity} sản phẩm ${currentProduct.name} vào giỏ hàng!`);
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-breadcrumb">
        <Link to="/">Trang chủ</Link> &gt; 
        <Link to={`/category/${currentProduct.productLine?.category?.id}`}>{currentProduct.productLine?.category?.name}</Link> &gt; 
        <span>{currentProduct.name}</span>
      </div>

      <div className="product-detail-main">
        <div className="product-detail-left">
          <div className="product-detail-image-main">
            <img src={renderProductImage()} alt={currentProduct.name} />
            {calculateDiscount() && (
              <div className="product-discount-badge">-{calculateDiscount()}</div>
            )}
          </div>
          <div className="product-detail-thumbnails">
            {/* Sẽ hiển thị thumbnails nếu có nhiều ảnh */}
          </div>
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-title">{currentProduct.name}</h1>
          
          <div className="product-detail-meta">
            <div className="product-detail-code">Mã sản phẩm: {currentProduct.code}</div>
            <div className="product-detail-brand">Thương hiệu: {currentProduct.productLine?.brand?.name}</div>
            <div className="product-detail-rating">
              <div className="rating-stars">
                {[...Array(5)].map((_, index) => (
                  <span 
                    key={index} 
                    className={`star ${index < Math.floor(currentProduct.rating || 0) ? 'filled' : ''}`}
                  >★</span>
                ))}
                <span className="rating-text">({currentProduct.rating?.toFixed(1)}/5)</span>
              </div>
              <span className="reviews-count">{currentProduct.reviewsCount} đánh giá</span>
            </div>
          </div>
          
          <div className="product-detail-price">
            <div className="current-price">{formatCurrency(currentProduct.price)}</div>
            {currentProduct.basePrice > currentProduct.price && (
              <div className="price-info">
                <div className="original-price">{formatCurrency(currentProduct.basePrice)}</div>
                <div className="discount-percentage">-{calculateDiscount()}</div>
              </div>
            )}
          </div>
          
          <div className="product-detail-promotions">
            <h3>Khuyến mãi đặc biệt</h3>
            {currentProduct.promotions && currentProduct.promotions.length > 0 ? (
              <ul className="promotions-list">
                {currentProduct.promotions.map((promo) => (
                  <li key={promo.id} className="promotion-item">
                    <div className="promotion-icon">🎁</div>
                    <div className="promotion-content">
                      <div className="promotion-name">{promo.name}</div>
                      <div className="promotion-value">Giảm {formatCurrency(promo.value)}</div>
                      <div className="promotion-period">
                        Từ {formatDate(promo.startDate)} đến {formatDate(promo.endDate)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-promotions">Không có khuyến mãi nào cho sản phẩm này</p>
            )}
          </div>
          
          <div className="product-detail-actions">
            <div className="quantity-selector">
              <button 
                className="quantity-btn" 
                onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
                disabled={quantity <= 1}
              >-</button>
              <input 
                type="number" 
                className="quantity-input" 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                min="1"
              />
              <button 
                className="quantity-btn" 
                onClick={() => setQuantity(prev => prev + 1)}
              >+</button>
            </div>
            
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <i className="cart-icon">🛒</i>
              Thêm vào giỏ hàng
            </button>

            <button className="buy-now-btn">
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      <div className="product-detail-tabs">
        <div className="tab-header">
          <div className="tab-link active">Thông số kỹ thuật</div>
          <div className="tab-link">Mô tả sản phẩm</div>
          <div className="tab-link">Đánh giá</div>
        </div>
        
        <div className="tab-content">
          <div className="attributes-table">
            <h3>Thông số kỹ thuật {currentProduct.name}</h3>
            <table>
              <tbody>
                {currentProduct.attributes && currentProduct.attributes.map((attr) => (
                  <tr key={attr.id}>
                    <td className="attribute-name">{attr.attribute.name}</td>
                    <td className="attribute-value">{attr.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="product-description">
            <h3>Thông tin chi tiết</h3>
            <div className="description-content">
              {currentProduct.description}
            </div>
          </div>
        </div>
      </div>

      <div className="product-detail-related">
        <h2>Sản phẩm tương tự</h2>
        <div className="related-products">
          {/* Sẽ hiển thị các sản phẩm liên quan sau */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
