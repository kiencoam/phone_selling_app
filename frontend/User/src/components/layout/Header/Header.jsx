import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useCart } from '../../../hooks/useCart';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import styles from './Header.module.css';

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const handleSearchSubmit = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className="container">
          <div className={styles.topBarContent}>
            <Link to="/" className={styles.logo}>
              <img 
                src="/assets/images/logo.png" 
                alt="Thế Giới Di Động Logo" 
                width="150" 
                height="30"
              />
            </Link>

            <SearchBar onSubmit={handleSearchSubmit} />

            <div className={styles.headerActions}>
              <Link to="/cart" className={styles.cartLink}>
                <i className="fas fa-shopping-cart"></i>
                <span className={styles.cartLabel}>Giỏ hàng</span>
                {cart.items.length > 0 && (
                  <span className={styles.cartCount}>{cart.items.length}</span>
                )}
              </Link>

              <div className={styles.userContainer}>
                {user ? (
                  <>
                    <button 
                      className={styles.userButton} 
                      onClick={toggleUserMenu}
                    >
                      <i className="fas fa-user-circle"></i>
                      <span>{user.name}</span>
                    </button>
                    {showUserMenu && (
                      <div className={styles.userMenu}>
                        <Link to="/account" className={styles.userMenuItem}>
                          <i className="fas fa-user"></i> Tài khoản
                        </Link>
                        <Link to="/account/orders" className={styles.userMenuItem}>
                          <i className="fas fa-box"></i> Đơn hàng
                        </Link>
                        <Link to="/wishlist" className={styles.userMenuItem}>
                          <i className="fas fa-heart"></i> Yêu thích
                        </Link>
                        <button 
                          onClick={handleLogout} 
                          className={styles.userMenuItem}
                        >
                          <i className="fas fa-sign-out-alt"></i> Đăng xuất
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link to="/login" className={styles.loginLink}>
                    <i className="fas fa-user"></i>
                    <span>Đăng nhập</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Navigation />
    </header>
  );
};

export default Header; 