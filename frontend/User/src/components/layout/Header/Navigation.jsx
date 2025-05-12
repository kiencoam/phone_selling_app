import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = ({ mobile, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      id: 'phone',
      name: 'Điện thoại',
      icon: 'fas fa-mobile-alt',
      submenu: [
        {
          title: 'Thương hiệu',
          items: [
            { name: 'iPhone', path: '/phone/apple' },
            { name: 'Samsung', path: '/phone/samsung' },
            { name: 'Xiaomi', path: '/phone/xiaomi' }
          ]
        },
        {
          title: 'Mức giá',
          items: [
            { name: 'Dưới 5 triệu', path: '/phone?price=0-5000000' },
            { name: '5-10 triệu', path: '/phone?price=5000000-10000000' },
            { name: 'Trên 10 triệu', path: '/phone?price=10000000-999999999' }
          ]
        }
      ]
    },
    // Thêm các categories khác tương tự
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <nav className={mobile ? styles.mobileNavigation : styles.navigation}>
      <ul className={styles.navList}>
        {categories.map((category) => (
          <li key={category.id} className={styles.navItem}>
            <Link 
              to={`/category/${category.id}`}
              className={styles.navLink}
              onClick={() => {
                handleCategoryClick(category.id);
                if (mobile && onClose) onClose();
              }}
            >
              <i className={`${category.icon} ${styles.navIcon}`}></i>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;