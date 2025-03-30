import React from 'react';
import { useState } from 'react';
import './loginpage.css';
import { VscAccount } from "react-icons/vsc";
import { IoMdPhonePortrait } from "react-icons/io";
import { MdLaptopChromebook, MdHeadphones } from "react-icons/md";
import { IoWatchOutline } from "react-icons/io5";
import { FiWatch } from "react-icons/fi";
import { LuTabletSmartphone } from "react-icons/lu";
import { CgSmartphoneShake } from "react-icons/cg";
import { BsPrinter } from "react-icons/bs";
import { RiSimCard2Line } from "react-icons/ri";
import { LiaFileContractSolid } from "react-icons/lia";
import { GrCart } from "react-icons/gr";

const LoginPage = () => {
  const [activeMenu, setActiveMenu] = useState('');

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  }

  const menuItems = [
    'Điện thoại',
    'Laptop',
    'Phụ kiện',
    'Smartwatch',
    'Đồng hồ',
    'Tablet',
    'Máy cũ, Thu cũ',
    'Màn hình, Máy in',
    'Sim, Thẻ cào',
    'Dịch vụ tiện ích',
  ];
  const menuIcons = {
    'Điện thoại': <IoMdPhonePortrait />,
    'Laptop': <MdLaptopChromebook />,
    'Phụ kiện': <MdHeadphones />,
    'Smartwatch': <IoWatchOutline />,
    'Đồng hồ': <FiWatch />,
    'Tablet': <LuTabletSmartphone />,
    'Máy cũ, Thu cũ': <CgSmartphoneShake />,
    'Màn hình, Máy in': <BsPrinter />,
    'Sim, Thẻ cào': <RiSimCard2Line />,
    'Dịch vụ tiện ích': <LiaFileContractSolid />,
  };
  return (
    <div className="login-page">
      <header className="header">
        <div className="logo">
          <a href="/">
            <img src="/img/tgdd.png" alt="Logo" />
          </a>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Bạn tìm gì..." />
        </div>
        <div className="header-right">
          <div className="btn">
            <VscAccount />
            <p>Đăng nhập</p>
          </div>
          <div className="btn">
            <GrCart />
            <p>Giỏ hàng</p>
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item}
              className={activeMenu === item ? 'active' : ''}
              onClick={() => handleMenuClick(item)}
            >
              {menuIcons[item]} {/* Render icon trước mỗi mục */}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Side - Illustration */}
        <div className="illustration">
          <img src="/img/TGDD-540x270.png" alt="Illustration" />
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form">
          <h2>Tra cứu thông tin đơn hàng</h2>
          <div className="input-group">
            <input type="text" placeholder="Nhập số điện thoại mua hàng" />
          </div>
          <button className="continue-btn">TIẾP TỤC</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-bottom">
          <p>© 2021 Công ty Cổ phần Thế Giới Di Động</p>
          <p>GPDKKD: 0303212251 do Sở KHĐT Tp.HCM cấp ngày 01/03/2008</p>
          <p>Địa chỉ: 128 Trần Quang Khải, P. Tân Định, Q.1, Tp.Hồ Chí Minh</p>
          <p>Điện thoại: 1800.1060. Website: www.thegioididong.com</p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;