import React from 'react';
import ImageCarousel from '../components/ImageCarousel.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

function ProductDetail() {
    const images = [
        '../img/20250326_005754.jpg',
        '../img/20250327_115123.jpg',
        '../img/20250327_115134.jpg',
        '../img/20250331_202043.jpg',
    ];

    // Inline styles for the carousel wrapper
    const carouselWrapperStyle = {
        width: '570px',
        height: '380px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'flex-start', // Align carousel to the left
        margin: '20px 0', // Add some spacing
    };

    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', // Align content to the left
        padding: '20px',
    };

    const headingStyle = {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    };

    const footerStyle = {
        textAlign: 'center',
        fontSize: '14px',
        color: '#777',
    };
    return (
        <div>
            <Header />
            <div style={pageStyle}>
                <div>
                <h1 style={headingStyle}>Đồng hồ thông minh Apple Watch Series 9 GPS 41mm viền nhôm dây vải</h1>
                <p style={footerStyle}>Đã bán 1,3k</p>
                </div>
                <div style={carouselWrapperStyle}>
                    <ImageCarousel images={images} />
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;