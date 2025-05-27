import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './Header.module.css';

// Import icons
import { ShoppingCart, User, Search, MapPin } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className={`${styles.header} ${styles.v2024} ${styles.hasbanner} ${isScrolled ? styles.sticky : ''}`}>
      {/* Banner */}
      <div className={styles.banner}>
        <div className={styles.container}>
          <img 
            src="..\assets\images\Banner\8-3.png" 
            alt="Trào yêu thương - Tặng deal xịn - Từ ngày 14.5 - 15.5" 
            className={styles.bannerImg}
          />
        </div>
      </div>

      {/* Header Top */}
      <div className={styles.header__top}>
        <div className={styles.container}>
          {/* Logo */}
          <Link to="/" className={styles.header__logo} aria-label="logo">
            <i className={styles.iconLogo}>thegioididong.com</i>
          </Link>

          {/* Search Form */}
          <form 
            action="/tim-kiem" 
            className={styles.header__search}
            onSubmit={handleSearchSubmit}
          >
            <Search className={styles.searchIcon} size={20} />
            <input 
              type="text" 
              className={styles.inputSearch} 
              placeholder="Bạn tìm gì..." 
              name="key" 
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* User Profile */}
          <div className={styles.loginBtn}>
            {isAuthenticated ? (
              <Link to="/profile" className={styles.login}>
                <User size={22} className={styles.userIcon} />
                <span>Đăng nhập</span>
              </Link>
            ) : (
              <Link to="/login" className={styles.login}>
                <User size={22} className={styles.userIcon} />
                <span>Đăng nhập</span>
              </Link>
            )}
          </div>

          {/* Cart */}
          <div className={styles.cartBtn}>
            <Link to="/cart" className={styles.cart}>
              <ShoppingCart size={22} className={styles.cartIcon} />
              <span>Giỏ hàng</span>
            </Link>
          </div>

          {/* Location */}
          <div className={styles.locationBtn}>
            <button className={styles.location}>
              <MapPin size={22} className={styles.locationIcon} />
              <span>Hồ Chí Minh</span>
              <i className={styles.arrowIcon}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className={styles.header__main}>
        <div className={styles.container}>
          <ul className={styles.mainMenu}>
            <li>
              <Link to="/dien-thoai" className={styles.menuItem}>
                <i className={styles.menuIcon}><img src="src\assets\images\Content\phonne-24x24.png" alt="Điện thoại" /></i>
                <span>Điện thoại</span>
              </Link>
            </li>
            <li>
              <Link to="/laptop" className={styles.menuItem}>
                <i className={styles.menuIcon}><img src="/src/assets/images/icons/laptop-icon.png" alt="Laptop" /></i>
                <span>Laptop</span>
              </Link>
            </li>
            <li>
              <Link to="/phu-kien" className={styles.menuItem}>
                <i className={styles.menuIcon}><img src="/src/assets/images/icons/accessories-icon.png" alt="Phụ kiện" /></i>
                <span>Phụ kiện</span>
                <i className={styles.arrowDownIcon}></i>
              </Link>
            </li>
            <li>
              <Link to="/smartwatch" className={styles.menuItem}>
                <i className={styles.menuIcon}><img src="/src/assets/images/icons/smartwatch-icon.png" alt="Smartwatch" /></i>
                <span>Smartwatch</span>
              </Link>
            </li>
            <li>
              <Link to="/dong-ho" className={styles.menuItem}>
                <i className={styles.menuIcon}><img src="/src/assets/images/icons/watch-icon.png" alt="Đồng hồ" /></i>
                <span>Đồng hồ</span>
              </Link>
            </li>
            <li>
              <Link to="/tablet" className={styles.menuItem}>
                <i className={styles.menuIcon}><img src="/src/assets/images/icons/tablet-icon.png" alt="Tablet" /></i>
                <span>Tablet</span>
              </Link>
            </li>
            <li>
              <Link to="/may-cu-thu-cu" className={styles.menuItem}>
                <i className={styles.menuIcon}><img src="/src/assets/images/icons/used-devices-icon.png" alt="Máy cũ, Thu cũ" /></i>
                <span>Máy cũ, Thu cũ</span>
                <i className={styles.arrowDownIcon}></i>
              </Link>
            </li>
            <li>
              <Link to="/man-hinh-may-in" className={styles.menuItem}>
                <i className={styles.menuIcon}><img src="/src/assets/images/icons/monitor-icon.png" alt="Màn hình, Máy in" /></i>
                <span>Màn hình, Máy in</span>
                <i className={styles.arrowDownIcon}></i>
              </Link>
            </li>
            <li>
              <Link to="/sim-the-cao" className={styles.menuItem}>
                <i className={styles.menuIcon}><img src="/src/assets/images/icons/sim-icon.png" alt="Sim, Thẻ cào" /></i>
                <span>Sim, Thẻ cào</span>
                <i className={styles.arrowDownIcon}></i>
              </Link>
            </li>
            <li>
              <Link to="/dich-vu-tien-ich" className={styles.menuItem}>
                <i className={styles.menuIcon}><img src="/src/assets/images/icons/services-icon.png" alt="Dịch vụ tiện ích" /></i>
                <span>Dịch vụ tiện ích</span>
                <i className={styles.arrowDownIcon}></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;