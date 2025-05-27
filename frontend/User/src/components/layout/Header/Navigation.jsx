import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = ({ mobile, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      id: 'phone',
      name: 'Điện thoại',
      icon: 'src/assets/images/Content/phonne-24x24.png',
      path: '/dtdd',
      hasSubmenu: false
    },
    {
      id: 'laptop',
      name: 'Laptop',
      icon: '/src/assets/images/Content/laptop-24x24.png',
      path: '/laptop',
      hasSubmenu: false
    },
    {
      id: 'accessories',
      name: 'Phụ kiện',
      icon: '/src/assets/images/Content/phu-kien-24x24.png',
      path: '/phu-kien',
      hasSubmenu: true,
      submenu: [
        {
          title: 'Phụ kiện di động',
          items: [
            { name: 'Sạc dự phòng', path: '/sac-dtdd', icon: '/src/assets/images/Phu-kien-di-dong/sac-du-phong.png' },
            { name: 'Sạc, cáp', path: '/sac-cap', icon: '/src/assets/images/Phu-kien-di-dong/sac-cap.png' },
            { name: 'Ốp lưng điện thoại', path: '/op-lung-flipcover', icon: '/src/assets/images/Phu-kien-di-dong/op-lung.png' }
          ]
        },
        {
          title: 'Thương hiệu hàng đầu',
          items: [
            { name: 'Apple', path: '/phu-kien/apple', icon: '/src/assets/images/Thuong-hieu/apple.png' },
            { name: 'Samsung', path: '/phu-kien/samsung', icon: '/src/assets/images/Thuong-hieu/samsung.png' }
          ]
        }
      ]
    },
    {
      id: 'smartwatch',
      name: 'Smartwatch',
      icon: '/src/assets/images/Content/smartwatch-24x24.png',
      path: '/dong-ho-thong-minh-ldp',
      hasSubmenu: false
    },
    {
      id: 'watch',
      name: 'Đồng hồ',
      icon: '/src/assets/images/Content/watch-24x24.png',
      path: '/dong-ho',
      hasSubmenu: false
    },
    {
      id: 'tablet',
      name: 'Tablet',
      icon: '/src/assets/images/Content/tablet-24x24.png',
      path: '/may-tinh-bang',
      hasSubmenu: false
    }
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <nav className={mobile ? styles.mobileNavigation : styles.navigation}>
      <ul className={styles.navList}>
        {categories.map((category) => (
          <li key={category.id} className={`${styles.navItem} ${category.hasSubmenu ? styles.hasList : ''} ${activeCategory === category.id ? styles.active : ''}`}>
            <Link 
              to={category.path}
              className={styles.navLink}
              onClick={(e) => {
                if (category.hasSubmenu && !mobile) {
                  e.preventDefault();
                  handleCategoryClick(category.id);
                } else if (mobile && onClose) {
                  onClose();
                }
              }}
            >
              <i>
                <img src={category.icon} alt={`icon ${category.name}`} />
              </i>
              <span className={category.hasSubmenu ? styles.hasChild : ''}>{category.name}</span>
            </Link>
            
            {category.hasSubmenu && activeCategory === category.id && (
              <div className={styles.navmwg}>
                {category.submenu.map((section, idx) => (
                  <div key={idx} className={styles.itemChild}>
                    <strong>{section.title}</strong>
                    {section.items.map((item, itemIdx) => (
                      <Link key={itemIdx} to={item.path} onClick={mobile && onClose ? onClose : undefined}>
                        <img className={styles.lazyMenu} src={item.icon} alt="thumb menu" width="25px" />
                        <h3>{item.name}</h3>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;