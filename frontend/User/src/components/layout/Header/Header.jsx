import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { useAuth } from '../../hooks/useAuth';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import styles from './Header.module.css';

// Import icons
import { ShoppingCart, Heart, User, Menu, X, Bell } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  
  // Lấy số lượng sản phẩm trong giỏ hàng
 // const cartItemsCount = cart?.items?.length || 0;

  // Kiểm tra scroll để thay đổi hiệu ứng của header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle menu điện thoại
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Khi mở menu, ngăn scroll của body
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.topBarContent}>
            <div className={styles.promoText}>
              Miễn phí vận chuyển cho đơn hàng từ 500.000đ
            </div>
            <div className={styles.topBarLinks}>
              <Link to="/promotion" className={styles.topBarLink}>Khuyến mãi</Link>
              <Link to="/store-location" className={styles.topBarLink}>Hệ thống cửa hàng</Link>
              <Link to="/support" className={styles.topBarLink}>Hỗ trợ</Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainHeader}>
        <div className={styles.container}>
          <div className={styles.mainHeaderContent}>
            {/* Logo */}
            <div className={styles.logoContainer}>
              <Link to="/" className={styles.logo}>
                PhoneTech
              </Link>
            </div>

            {/* SearchBar */}
            <div className={styles.searchBarWrapper}>
              <SearchBar />
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <Link to="/wishlist" className={styles.actionIcon}>
                <Heart size={22} />
                <span className={styles.actionLabel}>Yêu thích</span>
              </Link>

              <Link to="/cart" className={styles.actionIcon}>
                <div className={styles.cartIconWrapper}>
                  <ShoppingCart size={22} />
                  {cartItemsCount > 0 && (
                    <span className={styles.cartBadge}>{cartItemsCount}</span>
                  )}
                </div>
                <span className={styles.actionLabel}>Giỏ hàng</span>
              </Link>

              {isAuthenticated ? (
                <div className={styles.userDropdown}>
                  <button className={styles.userButton}>
                    <User size={22} />
                    <span className={styles.actionLabel}>{user?.firstName || 'Tài khoản'}</span>
                  </button>
                  <div className={styles.dropdownMenu}>
                    <Link to="/account" className={styles.dropdownItem}>Tài khoản của tôi</Link>
                    <Link to="/account/orders" className={styles.dropdownItem}>Đơn hàng</Link>
                    <Link to="/account/wishlist" className={styles.dropdownItem}>Danh sách yêu thích</Link>
                    <button onClick={logout} className={styles.dropdownItem}>Đăng xuất</button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className={styles.actionIcon}>
                  <User size={22} />
                  <span className={styles.actionLabel}>Đăng nhập</span>
                </Link>
              )}

              {/* Nút toggle menu trên mobile */}
              <button
                className={styles.mobileMenuToggle}
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className={styles.navigationWrapper}>
        <div className={styles.container}>
          <Navigation />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuHeader}>
            <SearchBar />
          </div>
          <div className={styles.mobileMenuContent}>
            <Navigation mobile={true} onClose={toggleMobileMenu} />
            <div className={styles.mobileMenuDivider}></div>
            <div className={styles.mobileMenuLinks}>
              <Link to="/promotion" className={styles.mobileMenuLink} onClick={toggleMobileMenu}>
                Khuyến mãi
              </Link>
              <Link to="/store-location" className={styles.mobileMenuLink} onClick={toggleMobileMenu}>
                Hệ thống cửa hàng
              </Link>
              <Link to="/support" className={styles.mobileMenuLink} onClick={toggleMobileMenu}>
                Hỗ trợ
              </Link>
            </div>
            <div className={styles.mobileMenuDivider}></div>
            {isAuthenticated ? (
              <div className={styles.mobileMenuUserLinks}>
                <Link to="/account" className={styles.mobileMenuLink} onClick={toggleMobileMenu}>
                  Tài khoản của tôi
                </Link>
                <Link to="/account/orders" className={styles.mobileMenuLink} onClick={toggleMobileMenu}>
                  Đơn hàng
                </Link>
                <Link to="/account/wishlist" className={styles.mobileMenuLink} onClick={toggleMobileMenu}>
                  Danh sách yêu thích
                </Link>
                <button onClick={() => { logout(); toggleMobileMenu(); }} className={styles.mobileMenuButton}>
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className={styles.mobileMenuAuth}>
                <Link to="/login" className={styles.mobileMenuAuthButton} onClick={toggleMobileMenu}>
                  Đăng nhập
                </Link>
                <Link to="/register" className={styles.mobileMenuAuthButtonOutline} onClick={toggleMobileMenu}>
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;