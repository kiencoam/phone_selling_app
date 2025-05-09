import React, { useState } from 'react';
import styles from './ProductGallery.module.css';

const ProductGallery = ({ images = [] }) => {
  const [activeImage, setActiveImage] = useState(0);
  
  // If no images are provided, show a placeholder
  if (!images || images.length === 0) {
    images = ['/assets/images/placeholder.jpg'];
  }

  return (
    <div className={styles.productGallery}>
      <div className={styles.mainImage}>
        <img src={images[activeImage]} alt="Product" />
      </div>
      
      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`${styles.thumbnail} ${index === activeImage ? styles.active : ''}`}
              onClick={() => setActiveImage(index)}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery; 