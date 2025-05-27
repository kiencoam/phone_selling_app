import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiService } from '../../services/api';
import styles from './Category.module.css';
import FilterSidebar from './FilterSidebar';
import ProductList from './ProductList';
import LoadingFallback from '../../components/common/LoadingFallback';

const Category = () => {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: '',
    brands: [],
    features: []
  });

  useEffect(() => {
    const fetchProducts = async () => {
      console.log('[Category] fetchProducts - start', { categorySlug });
      setLoading(true);
      try {
        const productsData = await ApiService.fetchProductsByCategory(categorySlug, filters);
        console.log('[Category] Products fetched successfully', { count: productsData.length });
        setProducts(productsData);
        setError(null);
      } catch (err) {
        console.error('[Category] Error fetching products:', err);
        setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, filters]);

  const handleFilterChange = (newFilters) => {
    console.log('[Category] Filter changed:', newFilters);
    setFilters(newFilters);
  };

  if (loading) {
    return <LoadingFallback message="Đang tải danh sách sản phẩm..." />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className={styles.refreshButton}
        >
          Tải lại trang
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <FilterSidebar onFilterChange={handleFilterChange} />
        </aside>
        <main className={styles.main}>
          <ProductList 
            products={products} 
            categoryName={getCategoryName(categorySlug)}
          />
        </main>
      </div>
    </div>
  );
};

// Helper function to get category name from slug
const getCategoryName = (slug) => {
  const categoryMap = {
    'phone': 'Điện thoại',
    'laptop': 'Laptop',
    'tablet': 'Máy tính bảng',
    'accessories': 'Phụ kiện',
    'smartwatch': 'Đồng hồ thông minh',
    'watch': 'Đồng hồ',
    'pc': 'PC, Máy in'
  };
  return categoryMap[slug] || slug;
};

export default Category;
