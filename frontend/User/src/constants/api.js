// Cấu hình API
export const API_CONFIG = {
  BASE_URL: 'https://phone-selling-app-mw21.onrender.com/api',
  TIMEOUT: 10000, // 10 seconds
  DEFAULT_PAGE_SIZE: 20,
  
  // Các endpoint
  ENDPOINTS: {
    // Auth
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    
    // Products
    PRODUCTS: '/products',
    PRODUCT_DETAIL: (id) => `/products/${id}`,
    PRODUCT_SEARCH: '/products/search',
    PRICE_RANGE: '/products/price-range',
    
    // Categories
    CATEGORIES: '/categories',
    CATEGORY_DETAIL: (id) => `/categories/${id}`,
    
    // Cart
    CART: '/cart',
    CART_ITEMS: '/cart/items',
    CART_ITEM: (id) => `/cart/items/${id}`,
    
    // Orders
    ORDERS: '/orders',
    ORDER_DETAIL: (id) => `/orders/${id}`,
    
    // Banners
    BANNERS: '/banners',
  }
}; 