// Cấu hình API
export const API_CONFIG = {
  BASE_URL: 'https://phone-selling-app-mw21.onrender.com/api',
  TIMEOUT: 10000, // 10 seconds
  DEFAULT_PAGE_SIZE: 20,
  ENDPOINTS: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PRODUCTS: '/v1/product/',
    FEATURED_PRODUCTS: '/products/featured',
    CATEGORIES: '/categories',
    CART: '/cart',
    ORDERS: '/orders',
    BANNERS: '/banners',
    PROMOTIONS: '/v1/promotion',
    SEARCH: '/v1/product/search',
    BRANDS: '/v1/brand',
    PRICE_RANGE: '/price-range'
  }
}; 