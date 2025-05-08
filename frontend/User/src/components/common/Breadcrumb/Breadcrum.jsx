import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumb.module.css';
import { HiHome } from 'react-icons/hi';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const getBreadcrumbName = (pathname) => {
    switch(pathname.toLowerCase()) {
      case 'phone': return 'Điện thoại';
      case 'laptop': return 'Laptop';
      case 'tablet': return 'Máy tính bảng'; 
      case 'smartwatch': return 'Đồng hồ thông minh';
      case 'watch': return 'Đồng hồ';
      case 'pc': return 'Máy tính';
      case 'accessory': return 'Phụ kiện';
      default: return pathname;
    }
  };

  return (
    <div className={styles.breadcrumb}>
      <div className={styles.container}>
        <Link to="/" className={styles.homeLink}>
          <HiHome className={styles.homeIcon} />
          <span>Trang chủ</span>
        </Link>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <React.Fragment key={routeTo}>
              <span className={styles.separator}>&gt;</span>
              {isLast ? (
                <span className={styles.current}>
                  {getBreadcrumbName(name)}
                </span>
              ) : (
                <Link to={routeTo}>{getBreadcrumbName(name)}</Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
