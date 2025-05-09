import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

// Import icons
import { ChevronDown, Smartphone, Laptop, Headphones, Watch, Cpu, Battery, Camera } from 'lucide-react';

const Navigation = ({ mobile = false, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  // Cấu trúc dữ liệu menu
  const menuCategories = [
    {
      id: 'phone',
      name: 'Điện thoại',
      icon: <Smartphone size={20} />,
      submenu: [
        {
          title: 'Thương hiệu',
          links: [
            { name: 'iPhone', path: '/phone/brand/apple' },
            { name: 'Samsung', path: '/phone/brand/samsung' },
            { name: 'Xiaomi', path: '/phone/brand/xiaomi' },
            { name: 'OPPO', path: '/phone/brand/oppo' },
            { name: 'Vivo', path: '/phone/brand/vivo' },
            { name: 'Realme', path: '/phone/brand/realme' },
            { name: 'Nokia', path: '/phone/brand/nokia' },
            { name: 'ASUS', path: '/phone/brand/asus' }
          ]
        },
        {
          title: 'Mức giá',
          links: [
            { name: 'Dưới 2 triệu', path: '/phone/price-range/under-2m' },
            { name: '2 - 4 triệu', path: '/phone/price-range/2m-4m' },
            { name: '4 - 7 triệu', path: '/phone/price-range/4m-7m' },
            { name: '7 - 13 triệu', path: '/phone/price-range/7m-13m' },
            { name: 'Trên 13 triệu', path: '/phone/price-range/above-13m' }
          ]
        },
        {
          title: 'Tính năng đặc biệt',
          links: [
            { name: 'Chơi game', path: '/phone/feature/gaming' },
            { name: 'Chụp ảnh/Quay phim', path: '/phone/feature/camera' },
            { name: 'Pin trâu', path: '/phone/feature/long-battery' },
            { name: 'Sạc nhanh', path: '/phone/feature/fast-charging' }
          ]
        }
      ]
    },
    {
      id: 'laptop',
      name: 'Laptop',
      icon: <Laptop size={20} />,
      submenu: [
        {
          title: 'Thương hiệu',
          links: [
            { name: 'MacBook', path: '/laptop/brand/apple' },
            { name: 'Dell', path: '/laptop/brand/dell' },
            { name: 'HP', path: '/laptop/brand/hp' },
            { name: 'Lenovo', path: '/laptop/brand/lenovo' },
            { name: 'ASUS', path: '/laptop/brand/asus' },
            { name: 'Acer', path: '/laptop/brand/acer' },
            { name: 'MSI', path: '/laptop/brand/msi' }
          ]
        },
        {
          title: 'Nhu cầu sử dụng',
          links: [
            { name: 'Học tập / Văn phòng', path: '/laptop/purpose/office' },
            { name: 'Gaming', path: '/laptop/purpose/gaming' },
            { name: 'Đồ họa / Kỹ thuật', path: '/laptop/purpose/design' },
            { name: 'Mỏng nhẹ', path: '/laptop/purpose/ultrabook' }
          ]
        },
        {
          title: 'Phân loại giá',
          links: [
            { name: 'Dưới 10 triệu', path: '/laptop/price-range/under-10m' },
            { name: '10 - 15 triệu', path: '/laptop/price-range/10m-15m' },
            { name: '15 - 20 triệu', path: '/laptop/price-range/15m-20m' },
            { name: '20 - 25 triệu', path: '/laptop/price-range/20m-25m' },
            { name: 'Trên 25 triệu', path: '/laptop/price-range/above-25m' },
          ]
        }
      ]
    },
    {
      id: 'accessory',
      name: 'Phụ kiện',
      icon: <Headphones size={20} />,
      submenu: [
        {
          title: 'Phụ kiện di động',
          links: [
            { name: 'Sạc dự phòng', path: '/accessory/mobile/power-bank' },
            { name: 'Cáp sạc', path: '/accessory/mobile/charging-cable' },
            { name: 'Adapter sạc', path: '/accessory/mobile/charging-adapter' },
            { name: 'Ốp lưng', path: '/accessory/mobile/case' },
            { name: 'Miếng dán màn hình', path: '/accessory/mobile/screen-protector' }
          ]
        },
        {
          title: 'Thiết bị âm thanh',
          links: [
            { name: 'Tai nghe không dây', path: '/accessory/audio/wireless-earphones' },
            { name: 'Tai nghe có dây', path: '/accessory/audio/wired-earphones' },
            { name: 'Loa bluetooth', path: '/accessory/audio/bluetooth-speaker' }
          ]
        },
        {
          title: 'Phụ kiện laptop',
          links: [
            { name: 'Balo', path: '/accessory/laptop/backpack' },
            { name: 'Túi chống sốc', path: '/accessory/laptop/sleeve' },
            { name: 'Chuột', path: '/accessory/laptop/mouse' },
            { name: 'Bàn phím', path: '/accessory/laptop/keyboard' }
          ]
        }
      ]
    },
    {
      id: 'smartwatch',
      name: 'Đồng hồ',
      icon: <Watch size={20} />,
      submenu: [
        {
          title: 'Theo thương hiệu',
          links: [
            { name: 'Apple Watch', path: '/smartwatch/brand/apple' },
            { name: 'Samsung', path: '/smartwatch/brand/samsung' },
            { name: 'Xiaomi', path: '/smartwatch/brand/xiaomi' },
            { name: 'Huawei', path: '/smartwatch/brand/huawei' },
            { name: 'Garmin', path: '/smartwatch/brand/garmin' }
          ]
        },
        {
          title: 'Mức giá',
          links: [
            { name: 'Dưới 1 triệu', path: '/smartwatch/price-range/under-1m' },
            { name: '1 - 3 triệu', path: '/smartwatch/price-range/1m-3m' },
            { name: '3 - 5 triệu', path: '/smartwatch/price-range/3m-5m' },
            { name: 'Trên 5 triệu', path: '/smartwatch/price-range/above-5m' }
          ]
        }
      ]
    },
    {
      id: 'pc-component',
      name: 'Linh kiện PC',
      icon: <Cpu size={20} />,
      submenu: [
        {
          title: 'Linh kiện cơ bản',
          links: [
            { name: 'CPU', path: '/pc-component/cpu' },
            { name: 'Mainboard', path: '/pc-component/mainboard' },
            { name: 'RAM', path: '/pc-component/ram' },
            { name: 'Ổ cứng', path: '/pc-component/storage' },
            { name: 'Card đồ họa', path: '/pc-component/gpu' }
          ]
        },
        {
          title: 'Linh kiện khác',
          links: [
            { name: 'Nguồn máy tính', path: '/pc-component/psu' },
            { name: 'Tản nhiệt', path: '/pc-component/cooling' },
            { name: 'Vỏ case', path: '/pc-component/case' }
          ]
        }
      ]
    }
  ];

  const handleCategoryHover = (categoryId) => {
    if (!mobile) {
      setActiveCategory(categoryId);
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (mobile) {
      setActiveCategory(activeCategory === categoryId ? null : categoryId);
    }
  };

  const handleLinkClick = () => {
    if (mobile && onClose) {
      onClose();
    }
  };

  const renderSubmenu = (category) => {
    return (
      <div className={mobile ? styles.mobileSubmenu : styles.submenu}>
        <div className={mobile ? styles.mobileSubmenuColumns : styles.submenuColumns}>
          {category.submenu.map((section, index) => (
            <div key={index} className={mobile ? styles.mobileSubmenuSection : styles.submenuSection}>
              <h4 className={mobile ? styles.mobileSubmenuTitle : styles.submenuTitle}>{section.title}</h4>
              <ul className={mobile ? styles.mobileSubmenuList : styles.submenuList}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className={mobile ? styles.mobileSubmenuItem : styles.submenuItem}>
                    <Link 
                      to={link.path} 
                      className={mobile ? styles.mobileSubmenuLink : styles.submenuLink}
                      onClick={handleLinkClick}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {!mobile && (
          <div className={styles.submenuPromo}>
            <div className={styles.submenuPromoCard}>
              <h4>Khuyến mãi hot</h4>
              <p>Giảm đến 50% cho sản phẩm {category.name}</p>
              <Link to={`/promotion/${category.id}`} className={styles.submenuPromoButton}>
                Xem ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={mobile ? styles.mobileNavigation : styles.navigation}>
      <ul className={mobile ? styles.mobileNavList : styles.navList}>
        {menuCategories.map((category) => (
          <li 
            key={category.id} 
            className={`
              ${mobile ? styles.mobileNavItem : styles.navItem}
              ${activeCategory === category.id ? (mobile ? styles.mobileNavItemActive : styles.navItemActive) : ''}
            `}
            onMouseEnter={() => handleCategoryHover(category.id)}
            onMouseLeave={() => !mobile && setActiveCategory(null)}
          >
            <div 
              className={mobile ? styles.mobileNavLink : styles.navLink}
              onClick={() => handleCategoryClick(category.id)}
            >
              <span className={mobile ? styles.mobileNavIcon : styles.navIcon}>
                {category.icon}
              </span>
              <span>{category.name}</span>
              <ChevronDown 
                size={16} 
                className={`
                  ${mobile ? styles.mobileNavArrow : styles.navArrow}
                  ${activeCategory === category.id ? (mobile ? styles.mobileNavArrowActive : styles.navArrowActive) : ''}
                `} 
              />
            </div>
            
            {/* Hiển thị submenu khi hover (desktop) hoặc click (mobile) */}
            {((!mobile && activeCategory === category.id) || (mobile && activeCategory === category.id)) && 
              renderSubmenu(category)
            }
          </li>
        ))}
        <li className={mobile ? styles.mobileNavItem : styles.navItem}>
          <Link to="/promotion" className={mobile ? styles.mobileNavLink : styles.navLink} onClick={handleLinkClick}>
            <span className={mobile ? styles.mobileNavIcon : styles.navIcon}>
              <Battery size={20} />
            </span>
            <span>Sale Sốc</span>
          </Link>
        </li>
        <li className={mobile ? styles.mobileNavItem : styles.navItem}>
          <Link to="/news" className={mobile ? styles.mobileNavLink : styles.navLink} onClick={handleLinkClick}>
            <span className={mobile ? styles.mobileNavIcon : styles.navIcon}>
              <Camera size={20} />
            </span>
            <span>Tin công nghệ</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;