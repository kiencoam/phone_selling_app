import React from 'react';
const Header = () => {
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
        <div className="btn">
            <p>Đăng nhập</p>
        </div>
        <div className="btn">
            <p>Giỏ hàng</p>
        </div>
        </div>
    </div>
)
}
export default Header;