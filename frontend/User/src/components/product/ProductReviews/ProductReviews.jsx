import React, { useState } from 'react';
import styles from './ProductReviews.module.css';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: 'Nguyễn Văn A',
      rating: 5,
      date: '2023-10-15',
      content: 'Sản phẩm tuyệt vời, đúng như mô tả. Đóng gói cẩn thận, giao hàng nhanh. Sẽ ủng hộ shop dài dài.',
      avatar: '/assets/images/avatars/avatar1.jpg'
    },
    {
      id: 2,
      user: 'Trần Thị B',
      rating: 4,
      date: '2023-10-10',
      content: 'Sản phẩm tốt, đáng tiền. Có một vài vết xước nhỏ nhưng không đáng kể.',
      avatar: '/assets/images/avatars/avatar2.jpg'
    },
    {
      id: 3,
      user: 'Lê Văn C',
      rating: 3,
      date: '2023-09-30',
      content: 'Sản phẩm tạm được, đáng tiền bỏ ra nhưng có thể tốt hơn.',
      avatar: '/assets/images/avatars/avatar3.jpg'
    }
  ]);
  
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className={styles.reviewsSection}>
      <h2>Đánh giá sản phẩm</h2>
      
      <div className={styles.reviewsSummary}>
        <div className={styles.ratingSummary}>
          <div className={styles.averageRating}>
            <span className={styles.ratingNumber}>{averageRating.toFixed(1)}</span>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map(star => (
                <i 
                  key={star} 
                  className={`fas fa-star ${star <= Math.round(averageRating) ? styles.filled : ''}`}
                ></i>
              ))}
            </div>
            <span className={styles.ratingCount}>{reviews.length} đánh giá</span>
          </div>
          
          <div className={styles.ratingDistribution}>
            {[5, 4, 3, 2, 1].map(rating => {
              const count = reviews.filter(review => review.rating === rating).length;
              const percentage = (count / reviews.length) * 100;
              
              return (
                <div key={rating} className={styles.ratingBar}>
                  <span className={styles.ratingLabel}>{rating} sao</span>
                  <div className={styles.ratingBarOuter}>
                    <div 
                      className={styles.ratingBarInner} 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className={styles.ratingCount}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <button className={styles.writeReviewBtn}>
          Viết đánh giá
        </button>
      </div>
      
      <div className={styles.reviewsList}>
        {reviews.map(review => (
          <div key={review.id} className={styles.reviewItem}>
            <div className={styles.reviewHeader}>
              <div className={styles.userInfo}>
                <img 
                  src={review.avatar} 
                  alt={review.user} 
                  className={styles.userAvatar} 
                />
                <div>
                  <div className={styles.userName}>{review.user}</div>
                  <div className={styles.reviewDate}>{formatDate(review.date)}</div>
                </div>
              </div>
              
              <div className={styles.reviewRating}>
                {[1, 2, 3, 4, 5].map(star => (
                  <i 
                    key={star} 
                    className={`fas fa-star ${star <= review.rating ? styles.filled : ''}`}
                  ></i>
                ))}
              </div>
            </div>
            
            <div className={styles.reviewContent}>
              {review.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews; 