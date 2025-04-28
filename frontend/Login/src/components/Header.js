import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const goToCart = () => {
    // Bạn có thể thêm logic trước khi chuyển hướng nếu cần
    navigate('/cart');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="logo">
        <a href="/">
          <img src="./img/tgdd.png" alt="Logo" />
        </a>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Bạn tìm gì..." />
      </div>
      <div className="header-right">
        <div className="btn" onClick={goToLogin}>
          <p>Đăng nhập</p>
        </div>
        <div className="btn" onClick={goToCart}>
          <p>Giỏ hàng</p>
        </div>
      </div>
    </div>
  );
};

export default Header;