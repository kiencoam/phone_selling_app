import axios from 'axios';
import { API_CONFIG } from '../constants/api';

// API base URL
const API_BASE_URL = API_CONFIG.BASE_URL;

// Tạo dữ liệu mẫu cho fallback trong trường hợp API không hoạt động
const FALLBACK_DATA = {
  products: [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 34990000,
      discountPrice: 32990000,
      imageUrl: '/assets/images/products/iphone-15-pro-max.jpg',
      categoryId: 'phone',
      brandId: 'apple',
      rating: 4.9,
      reviewCount: 120,
      stockStatus: 'in_stock'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      price: 31990000,
      discountPrice: 29990000,
      imageUrl: '/assets/images/products/samsung-galaxy-s24.jpg',
      categoryId: 'phone',
      brandId: 'samsung',
      rating: 4.8,
      reviewCount: 95,
      stockStatus: 'in_stock'
    }
  ],
  categories: [
    { id: 'phone', name: 'Điện thoại', icon: 'fa-mobile-alt', path: '/phone' },
    { id: 'laptop', name: 'Laptop', icon: 'fa-laptop', path: '/laptop' }
  ],
  banners: [
    {
      id: 1,
      title: 'iPhone 15 Pro Max Mới',
      imageUrl: '/assets/images/banners/iphone-15-pro-max.jpg',
      link: '/product/iphone-15-pro-max'
    }
  ],
  cart: {
    items: [],
    total: 0
  },
  orders: []
};

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: API_CONFIG.TIMEOUT, // 10 seconds timeout
});

// Add request interceptor for auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`, {
      hasToken: !!token,
      params: config.params
    });
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.config.method.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      data: response.data ? (typeof response.data === 'object' ? 'Object Data' : 'Data') : null
    });
    return response;
  },
  (error) => {
    console.error(`[API Error] ${error.config?.method?.toUpperCase() || 'UNKNOWN'} ${error.config?.url || 'unknown'}`, {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Clear local storage but don't redirect automatically
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      // Chỉ chuyển hướng nếu đang ở trang yêu cầu xác thực
      const protectedRoutes = ['/cart', '/checkout', '/profile', '/orders'];
      const currentPath = window.location.pathname;
      
      console.log('[Auth] 401 Error - Protected route check', {
        currentPath,
        isProtected: protectedRoutes.some(route => currentPath.startsWith(route))
      });
      
      if (protectedRoutes.some(route => currentPath.startsWith(route))) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// For demo purposes, we'll add some mock data
const mockBanners = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max Mới',
    imageUrl: '/assets/images/banners/iphone-15-pro-max.jpg',
    link: '/product/iphone-15-pro-max',
    categoryId: 'phone',
    placeId: 'home'
  },
  {
    id: 2,
    title: 'Samsung Galaxy S24 Ultra',
    imageUrl: '/assets/images/banners/samsung-galaxy-s24.jpg',
    link: '/product/samsung-galaxy-s24-ultra',
    categoryId: 'phone',
    placeId: 'home'
  },
  {
    id: 3,
    title: 'Laptop Gaming Asus ROG',
    imageUrl: '/assets/images/banners/asus-rog.jpg',
    link: '/product/asus-rog-strix-g16',
    categoryId: 'laptop',
    placeId: 'home'
  }
];

const mockCategories = [
  { id: 'phone', name: 'Điện thoại', icon: 'fa-mobile-alt', path: '/phone' },
  { id: 'laptop', name: 'Laptop', icon: 'fa-laptop', path: '/laptop' },
  { id: 'tablet', name: 'Máy tính bảng', icon: 'fa-tablet-alt', path: '/tablet' },
  { id: 'smartwatch', name: 'Đồng hồ thông minh', icon: 'fa-clock', path: '/smartwatch' },
  { id: 'accessories', name: 'Phụ kiện', icon: 'fa-headphones', path: '/accessory' },
  { id: 'watch', name: 'Đồng hồ', icon: 'fa-stopwatch', path: '/watch' },
  { id: 'pc', name: 'PC, Máy in', icon: 'fa-desktop', path: '/pc' },
];

const mockPriceRange = {
  min: 1000000,
  max: 50000000,
  steps: [1000000, 3000000, 7000000, 10000000, 15000000, 25000000, 50000000]
};

const mockProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 34990000,
    discountPrice: 32990000,
    imageUrl: '/assets/images/products/iphone-15-pro-max.jpg',
    categoryId: 'phone',
    brandId: 'apple',
    rating: 4.9,
    reviewCount: 120,
    stockStatus: 'in_stock',
    specifications: {
      screen: '6.7 inches, Super Retina XDR OLED',
      cpu: 'Apple A17 Pro',
      ram: '8GB',
      storage: '256GB',
      camera: 'Triple 48MP + 12MP + 12MP',
      battery: '4422mAh'
    }
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    price: 31990000,
    discountPrice: 29990000,
    imageUrl: '/assets/images/products/samsung-galaxy-s24.jpg',
    categoryId: 'phone',
    brandId: 'samsung',
    rating: 4.8,
    reviewCount: 95,
    stockStatus: 'in_stock',
    specifications: {
      screen: '6.8 inches, Dynamic AMOLED 2X',
      cpu: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      camera: 'Quad 200MP + 12MP + 50MP + 10MP',
      battery: '5000mAh'
    }
  },
  {
    id: 3,
    name: 'Xiaomi 14 Pro',
    price: 19990000,
    discountPrice: 18490000,
    imageUrl: '/assets/images/products/xiaomi-14-pro.jpg',
    categoryId: 'phone',
    brandId: 'xiaomi',
    rating: 4.6,
    reviewCount: 78,
    stockStatus: 'in_stock',
    specifications: {
      screen: '6.73 inches, AMOLED',
      cpu: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      camera: 'Triple 50MP + 50MP + 50MP',
      battery: '4880mAh'
    }
  },
  {
    id: 4,
    name: 'OPPO Find X7 Ultra',
    price: 24990000,
    discountPrice: 23990000,
    imageUrl: '/assets/images/products/oppo-find-x7.jpg',
    categoryId: 'phone',
    brandId: 'oppo',
    rating: 4.7,
    reviewCount: 64,
    stockStatus: 'in_stock',
    specifications: {
      screen: '6.82 inches, AMOLED',
      cpu: 'Dimensity 9300',
      ram: '16GB',
      storage: '512GB',
      camera: 'Quad 50MP + 50MP + 50MP + 50MP',
      battery: '5150mAh'
    }
  },
  {
    id: 5,
    name: 'MacBook Pro 16 M3 Max',
    price: 85990000,
    discountPrice: null,
    imageUrl: '/assets/images/products/macbook-pro-16.jpg',
    categoryId: 'laptop',
    brandId: 'apple',
    rating: 4.9,
    reviewCount: 45,
    stockStatus: 'in_stock',
    specifications: {
      screen: '16.2 inches, Liquid Retina XDR',
      cpu: 'Apple M3 Max',
      ram: '64GB',
      storage: '1TB SSD',
      gpu: 'Apple GPU 40-core',
      battery: 'Up to 22 hours'
    }
  },
  {
    id: 6,
    name: 'Asus ROG Strix G16',
    price: 45990000,
    discountPrice: 42990000,
    imageUrl: '/assets/images/products/asus-rog-strix.jpg',
    categoryId: 'laptop',
    brandId: 'asus',
    rating: 4.7,
    reviewCount: 36,
    stockStatus: 'in_stock',
    specifications: {
      screen: '16 inches, QHD 240Hz',
      cpu: 'Intel Core i9-14900H',
      ram: '32GB',
      storage: '1TB SSD',
      gpu: 'NVIDIA RTX 4080',
      battery: '90Whr'
    }
  }
];

// Thêm mock data cho cart
const mockCart = {
  items: [
    {
      productId: 1,
      quantity: 2,
      product: mockProducts[0]
    },
    {
      productId: 2,
      quantity: 1,
      product: mockProducts[1]
    }
  ],
  total: 95970000
};

// Thêm mock data cho orders
const mockOrders = [
  {
    id: 1,
    orderNumber: "ORD001",
    date: "2024-02-20",
    status: "delivered",
    items: [mockProducts[0]],
    total: 32990000,
    shippingAddress: "123 Đường ABC, Quận 1, TP.HCM"
  },
  {
    id: 2, 
    orderNumber: "ORD002",
    date: "2024-02-21",
    status: "processing",
    items: [mockProducts[1], mockProducts[2]],
    total: 48480000,
    shippingAddress: "456 Đường XYZ, Quận 2, TP.HCM"
  }
];

// API Service class
export class ApiService {
  // Banners
  static async fetchBanners() {
    console.log('[ApiService] fetchBanners - start');
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.BANNERS);
      console.log('[ApiService] fetchBanners - success', { count: response.data.length });
      return response.data;
    } catch (error) {
      console.error('[ApiService] fetchBanners - error:', error);
      console.log('[ApiService] fetchBanners - using fallback data');
      return FALLBACK_DATA.banners;
    }
  }

  // Categories
  static async fetchCategories() {
    console.log('[ApiService] fetchCategories - start');
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.CATEGORIES);
      console.log('[ApiService] fetchCategories - success', { count: response.data.length });
      return response.data;
    } catch (error) {
      console.error('[ApiService] fetchCategories - error:', error);
      console.log('[ApiService] fetchCategories - using fallback data');
      return FALLBACK_DATA.categories;
    }
  }

  // Products
  static async fetchProducts(filters = {}) {
    console.log('[ApiService] fetchProducts - start', { filters });
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCTS, { params: filters });
      console.log('[ApiService] fetchProducts - success', { 
        resultCount: response.data.length || response.data.content?.length
      });
      
      // Handle paginated response
      if (response.data.content && Array.isArray(response.data.content)) {
        return response.data.content;
      }
      
      return response.data;
    } catch (error) {
      console.error('[ApiService] fetchProducts - error:', error);
      console.log('[ApiService] fetchProducts - using fallback data');
      
      // Áp dụng filter đơn giản cho dữ liệu fallback
      let filteredProducts = [...FALLBACK_DATA.products];
      
      if (filters.categoryId) {
        filteredProducts = filteredProducts.filter(p => p.categoryId === filters.categoryId);
      }
      
      if (filters.brandId) {
        filteredProducts = filteredProducts.filter(p => p.brandId === filters.brandId);
      }
      
      return filteredProducts;
    }
  }

  // Product detail
  static async fetchProductById(productId) {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCT_DETAIL(productId));
      return response.data;
    } catch (error) {
      console.error(`[ApiService] Error fetching product ${productId}:`, error);
      console.log(`[ApiService] fetchProductById - using fallback data for product ${productId}`);
      
      // Find product in fallback data
      const product = FALLBACK_DATA.products.find(p => p.id === parseInt(productId, 10));
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    }
  }

  // Price range
  static async fetchPriceRange() {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRICE_RANGE);
      return response.data;
    } catch (error) {
      console.error('[ApiService] Error fetching price range:', error);
      throw error;
    }
  }

  // Search
  static async searchProducts(query) {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCT_SEARCH, { 
        params: { 
          keyword: query,
          page: 0,
          size: API_CONFIG.DEFAULT_PAGE_SIZE
        } 
      });
      
      // Handle paginated response
      if (response.data.content && Array.isArray(response.data.content)) {
        return response.data.content;
      }
      
      return response.data;
    } catch (error) {
      console.error('[ApiService] Error searching products:', error);
      console.log('[ApiService] searchProducts - using fallback data');
      
      // Filter fallback data based on query
      const searchTerm = query.toLowerCase();
      return FALLBACK_DATA.products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.categoryId.toLowerCase().includes(searchTerm) ||
        p.brandId?.toLowerCase().includes(searchTerm)
      );
    }
  }

  // Fetch Hot Phones
  static async fetchHotPhones() {
    console.log('[ApiService] fetchHotPhones - start');
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCTS, { 
        params: { 
          categoryId: 'phone',
          featured: true,
          page: 0,
          size: 10
        } 
      });
      
      let phonesData = [];
      
      if (response?.data?.content && Array.isArray(response.data.content)) {
        // API trả về dạng phân trang
        console.log('[ApiService] fetchHotPhones - API returned paginated data');
        phonesData = response.data.content;
      } else if (response?.data && Array.isArray(response.data)) {
        // API trả về mảng trực tiếp
        console.log('[ApiService] fetchHotPhones - API returned array data');
        phonesData = response.data;
      }
      
      console.log('[ApiService] fetchHotPhones - success', { resultCount: phonesData.length });
      return phonesData;
    } catch (error) {
      console.error('[ApiService] fetchHotPhones - error:', error);
      console.log('[ApiService] fetchHotPhones - using fallback data');
      return FALLBACK_DATA.products.filter(p => p.categoryId === 'phone');
    }
  }

  // Cart methods
  static async getCart() {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.CART);
      return response.data;
    } catch (error) {
      console.error('[ApiService] Error getting cart:', error);
      console.log('[ApiService] getCart - using fallback data');
      return FALLBACK_DATA.cart;
    }
  }

  static async updateCartItem(productId, quantity) {
    try {
      const response = await apiClient.put(API_CONFIG.ENDPOINTS.CART_ITEM(productId), { quantity });
      return response.data;
    } catch (error) {
      console.error('[ApiService] Error updating cart:', error);
      console.log('[ApiService] updateCartItem - using fallback data');
      
      // Cập nhật giỏ hàng trong dữ liệu fallback
      const existingItemIndex = FALLBACK_DATA.cart.items.findIndex(item => item.productId === productId);
      
      if (existingItemIndex >= 0) {
        FALLBACK_DATA.cart.items[existingItemIndex].quantity = quantity;
      }
      
      return { success: true };
    }
  }

  static async addToCart(productId, quantity = 1) {
    try {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.CART_ITEMS, { productId, quantity });
      return response.data;
    } catch (error) {
      console.error(`[ApiService] Error adding product ${productId} to cart:`, error);
      console.log('[ApiService] addToCart - using fallback data');
      
      // Thêm vào giỏ hàng trong dữ liệu fallback
      const product = FALLBACK_DATA.products.find(p => p.id === productId);
      
      if (product) {
        const existingItemIndex = FALLBACK_DATA.cart.items.findIndex(item => item.productId === productId);
        
        if (existingItemIndex >= 0) {
          FALLBACK_DATA.cart.items[existingItemIndex].quantity += quantity;
        } else {
          FALLBACK_DATA.cart.items.push({
            productId,
            quantity,
            product
          });
        }
      }
      
      return { success: true };
    }
  }

  static async removeFromCart(productId) {
    try {
      const response = await apiClient.delete(API_CONFIG.ENDPOINTS.CART_ITEM(productId));
      return response.data;
    } catch (error) {
      console.error(`[ApiService] Error removing product ${productId} from cart:`, error);
      console.log('[ApiService] removeFromCart - using fallback data');
      
      // Xóa khỏi giỏ hàng trong dữ liệu fallback
      FALLBACK_DATA.cart.items = FALLBACK_DATA.cart.items.filter(item => item.productId !== productId);
      
      return { success: true };
    }
  }

  // Order methods
  static async getOrders() {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.ORDERS);
      return response.data;
    } catch (error) {
      console.error('[ApiService] Error getting orders:', error);
      console.log('[ApiService] getOrders - using fallback data');
      return FALLBACK_DATA.orders;
    }
  }

  static async getOrderById(orderId) {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.ORDER_DETAIL(orderId));
      return response.data;
    } catch (error) {
      console.error('[ApiService] Error getting order:', error);
      console.log('[ApiService] getOrderById - using fallback data');
      
      const order = FALLBACK_DATA.orders.find(o => o.id === orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      
      return order;
    }
  }

  static async createOrder(orderData) {
    try {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.ORDERS, orderData);
      return response.data;
    } catch (error) {
      console.error('[ApiService] Error creating order:', error);
      console.log('[ApiService] createOrder - using fallback data');
      
      // Tạo đơn hàng mới trong dữ liệu fallback
      const newOrder = {
        id: Date.now(),
        orderNumber: `ORD${Date.now().toString().slice(-6)}`,
        date: new Date().toISOString().split('T')[0],
        status: 'processing',
        ...orderData
      };
      
      FALLBACK_DATA.orders.push(newOrder);
      
      // Xóa giỏ hàng sau khi đặt hàng
      FALLBACK_DATA.cart.items = [];
      
      return { success: true, orderId: newOrder.id };
    }
  }
}