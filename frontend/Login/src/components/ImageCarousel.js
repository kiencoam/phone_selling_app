import React, { useState } from 'react';
import '../assets/styles/ImageCarousel.css'; // Import CSS for styling

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1); // State để quản lý zoom
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Vị trí của ảnh
  const [isDragging, setIsDragging] = useState(false); // Trạng thái kéo
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 }); // Vị trí bắt đầu kéo
  const [isLightboxOpen, setIsLightboxOpen] = useState(false); // Trạng thái mở lightbox

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handleWheel = (event) => {
    event.preventDefault(); // Ngăn cuộn trang khi zoom

    // Lấy vị trí của con trỏ chuột so với ảnh
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left; // Vị trí X của chuột trong ảnh
    const offsetY = event.clientY - rect.top; // Vị trí Y của chuột trong ảnh
    const originX = (offsetX / rect.width) * 100; // Tính phần trăm vị trí X
    const originY = (offsetY / rect.height) * 100; // Tính phần trăm vị trí Y

    // Cập nhật mức độ zoom
    setZoomLevel((prevZoom) => {
      const newZoom = prevZoom + event.deltaY * -0.001; // Điều chỉnh tốc độ zoom
      return Math.min(Math.max(newZoom, 1), 3); // Giới hạn zoom từ 1x đến 3x
    });

    // Cập nhật vị trí zoom (transform-origin) cho ảnh
    const imageElement = event.currentTarget.querySelector('img');
    if (imageElement) {
      imageElement.style.transformOrigin = `${originX}% ${originY}%`;
    }
  };

  const handleMouseDown = (event) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setStartDrag({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const deltaX = event.clientX - startDrag.x;
      const deltaY = event.clientY - startDrag.y;
      setPosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }));
      setStartDrag({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <div className="carousel-container">
      {/* Main Image */}
      <div
        className="main-image"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={openLightbox} // Mở lightbox khi nhấn vào ảnh
      >
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          style={{
            transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
            objectFit: zoomLevel > 1 ? 'contain' : 'cover',
            cursor: zoomLevel > 1 ? 'grab' : 'pointer',
          }}
        />
        <button className="arrow left-arrow" onClick={handlePrev}>
          &lt;
        </button>
        <button className="arrow right-arrow" onClick={handleNext}>
          &gt;
        </button>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content">
            <img
              src={images[currentIndex]}
              alt={`Lightbox Slide ${currentIndex}`}
              /*the light box image should be zoomable and draggable*/
              style={{
                transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                objectFit: zoomLevel > 1 ? 'contain' : 'cover',
                cursor: zoomLevel > 1 ? 'grab' : 'pointer',
              }}
              
            />
          </div>
        </div>
      )}

      {/* Thumbnails */}
      <div className="thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className={`thumbnail ${currentIndex === index ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="image-counter">
        {currentIndex + 1}/{images.length}
      </div>
    </div>
  );
};

export default ImageCarousel;