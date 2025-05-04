import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';
import { ApiService } from '../../../services/api.service';

const Navigation = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await ApiService.fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback categories if API fails
        setCategories([
          { id: 'phone', name: 'Điện thoại', icon: 'fa-mobile-alt', path: '/phone' },
          { id: 'laptop', name: 'Laptop', icon: 'fa-laptop', path: '/laptop' },
          { id: 'tablet', name: 'Máy tính bảng', icon: 'fa-tablet-alt', path: '/tablet' },
          { id: 'smartwatch', name: 'Đồng hồ thông minh', icon: 'fa-clock', path: '/smartwatch' },
          { id: 'accessories', name: 'Phụ kiện', icon: 'fa-headphones', path: '/accessory' },
          { id: 'watch', name: 'Đồng hồ', icon: 'fa-stopwatch', path: '/watch' },
          { id: 'pc', name: 'PC, Máy in', icon: 'fa-desktop', path: '/pc' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className={styles.navigation}>
      <div className="container">
        <ul className={styles.navList}>
          {loading ? (
            // Skeleton loading state
            Array(7).fill(0).map((_, index) => (
              <li key={`skeleton-${index}`} className={`${styles.navItem} ${styles.skeleton}`}>
                <div className={styles.skeletonIcon}></div>
                <div className={styles.skeletonText}></div>
              </li>
            ))
          ) : (
            categories.map((category) => (
              <li 
                key={category.id} 
                className={`${styles.navItem} ${location.pathname === category.path ? styles.active : ''}`}
              >
                <Link to={category.path} className={styles.navLink}>
                  <i className={`fas ${category.icon}`}></i>
                  <span>{category.name}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 