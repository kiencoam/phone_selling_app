import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaUserCircle, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../../redux/slices/authSlice';
import '../../assets/styles/Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>Tech Shop</h1>
          </Link>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm sản phẩm..." />
          <button type="submit">
            <FaSearch />
          </button>
        </div>

        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/products">Sản phẩm</Link>
            </li>
            <li className="cart-icon">
              <Link to="/cart">
                <FaShoppingCart />
                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
              </Link>
            </li>
            {isAuthenticated ? (
              <li className="user-dropdown">
                <div className="user-menu-trigger">
                  <FaUserCircle />
                  <span>{user?.name}</span>
                </div>
                <div className="dropdown-menu">
                  <Link to="/profile">Thông tin tài khoản</Link>
                  <Link to="/orders">Đơn hàng của tôi</Link>
                  <button onClick={handleLogout} className="logout-button">
                    <FaSignOutAlt /> Đăng xuất
                  </button>
                </div>
              </li>
            ) : (
              <li>
                <Link to="/login" className="auth-link">Đăng nhập</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
