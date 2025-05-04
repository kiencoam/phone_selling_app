import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Hỗ trợ khách hàng</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="/support/purchase">Trung tâm trợ giúp mua hàng</Link>
              </li>
              <li>
                <Link to="/support/security">Chính sách bảo mật</Link>
              </li>
              <li>
                <Link to="/shipping">Chính sách vận chuyển</Link>
              </li>
              <li>
                <Link to="/warranty">Chính sách bảo hành</Link>
              </li>
              <li>
                <Link to="/refund">Chính sách đổi trả</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Về công ty</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="/about">Giới thiệu công ty</Link>
              </li>
              <li>
                <Link to="/career">Tuyển dụng</Link>
              </li>
              <li>
                <Link to="/terms">Điều khoản sử dụng</Link>
              </li>
              <li>
                <Link to="/privacy">Chính sách bảo mật</Link>
              </li>
              <li>
                <Link to="/contact">Liên hệ</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Phương thức thanh toán</h3>
            <div className={styles.paymentMethods}>
              <img src="/assets/images/visa.png" alt="Visa" />
              <img src="/assets/images/mastercard.png" alt="Mastercard" />
              <img src="/assets/images/jcb.png" alt="JCB" />
              <img src="/assets/images/cod.png" alt="COD" />
              <img src="/assets/images/momo.png" alt="MoMo" />
              <img src="/assets/images/zalopay.png" alt="ZaloPay" />
            </div>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Kết nối với chúng tôi</h3>
            <div className={styles.socialLinks}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-square"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="https://zalo.me" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-comment"></i>
              </a>
            </div>

            <h3 className={styles.footerHeading}>Tải ứng dụng</h3>
            <div className={styles.appLinks}>
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                <img src="/assets/images/appstore.png" alt="App Store" />
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                <img src="/assets/images/googleplay.png" alt="Google Play" />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © 2023 Phone Selling App. Tất cả các quyền được bảo lưu.
          </p>
          <div className={styles.companyInfo}>
            <p>Công ty TNHH Phone Selling App</p>
            <p>Địa chỉ: 123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh</p>
            <p>Số điện thoại: (028) 1234 5678</p>
            <p>Email: support@phonesellingapp.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 