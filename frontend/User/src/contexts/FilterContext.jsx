import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ApiService } from '../services/api';
import { useContext } from 'react';

export const FilterContext = createContext();
export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const location = useLocation();
  const [filters, setFilters] = useState({
    category: null,
    brand: null,
    minPrice: null,
    maxPrice: null,
    search: '',
    sort: 'popularity', // Default sort
  });
  
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0, steps: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update category filter when URL changes
  useEffect(() => {
    const path = location.pathname;
    
    // Reset filters when navigating to home
    if (path === '/') {
      setFilters(prev => ({
        ...prev,
        category: null,
        brand: null,
        minPrice: null,
        maxPrice: null,
        search: ''
      }));
      return;
    }
    
    // Extract category from path
    if (path.includes('/phone')) {
      updateFilter('category', 'phone');
    } else if (path.includes('/laptop')) {
      updateFilter('category', 'laptop');
    } else if (path.includes('/tablet')) {
      updateFilter('category', 'tablet');
    } else if (path.includes('/accessory')) {
      updateFilter('category', 'accessories');
    } else if (path.includes('/smartwatch')) {
      updateFilter('category', 'smartwatch');
    } else if (path.includes('/watch')) {
      updateFilter('category', 'watch');
    } else if (path.includes('/pc')) {
      updateFilter('category', 'pc');
    }
    
    // Extract search query from URL
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      updateFilter('search', searchQuery);
    }
  }, [location]);

  // Get price range and brands when category changes
  useEffect(() => {
    const fetchFilterData = async () => {
      setLoading(true);
      try {
        // Fetch price range
        const priceRangeData = await ApiService.fetchPriceRange();
        setPriceRange(priceRangeData);
        
        // In a real app, fetch brands based on category
        // For now, hard-code some common brands
        if (filters.category === 'phone') {
          setBrands([
            { id: 'apple', name: 'Apple' },
            { id: 'samsung', name: 'Samsung' },
            { id: 'xiaomi', name: 'Xiaomi' },
            { id: 'oppo', name: 'OPPO' },
            { id: 'vivo', name: 'Vivo' },
            { id: 'realme', name: 'Realme' },
            { id: 'nokia', name: 'Nokia' },
          ]);
        } else if (filters.category === 'laptop') {
          setBrands([
            { id: 'apple', name: 'Apple' },
            { id: 'dell', name: 'Dell' },
            { id: 'hp', name: 'HP' },
            { id: 'lenovo', name: 'Lenovo' },
            { id: 'asus', name: 'Asus' },
            { id: 'acer', name: 'Acer' },
            { id: 'msi', name: 'MSI' },
          ]);
        } else {
          setBrands([]);
        }
      } catch (err) {
        console.error('Error fetching filter data:', err);
        setError(err.message || 'Failed to load filter data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchFilterData();
  }, [filters.category]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: null,
      brand: null,
      minPrice: null,
      maxPrice: null,
      search: '',
      sort: 'popularity',
    });
  };

  const value = {
    filters,
    priceRange,
    brands,
    loading,
    error,
    updateFilter,
    resetFilters,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;

 
  }; 