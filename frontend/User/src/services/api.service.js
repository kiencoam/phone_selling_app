import axios from 'axios';

// API base URL - this would be replaced with your actual API URL
const API_BASE_URL = 'https://api.phonesellingapp.com/api';

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
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

// API Service class
export class ApiService {
  // Banners
  static async fetchBanners() {
    try {
      // For demo, return mock data
      // In production, uncomment the following:
      // const response = await apiClient.get('/banners');
      // return response.data;
      
      return mockBanners;
    } catch (error) {
      console.error('Error fetching banners:', error);
      throw error;
    }
  }

  // Categories
  static async fetchCategories() {
    try {
      // For demo, return mock data
      // In production, uncomment the following:
      // const response = await apiClient.get('/categories');
      // return response.data;
      
      return mockCategories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Products
  static async fetchProducts(filters = {}) {
    try {
      // For demo, return mock data with filtering
      // In production, uncomment the following:
      // const response = await apiClient.get('/products', { params: filters });
      // return response.data;
      
      let filteredProducts = [...mockProducts];
      
      // Apply category filter
      if (filters.category) {
        filteredProducts = filteredProducts.filter(p => p.categoryId === filters.category);
      }
      
      // Apply brand filter
      if (filters.brand) {
        filteredProducts = filteredProducts.filter(p => p.brandId === filters.brand);
      }
      
      // Apply price filter
      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(p => (p.discountPrice || p.price) >= filters.minPrice);
      }
      
      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(p => (p.discountPrice || p.price) <= filters.maxPrice);
      }
      
      // Apply search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(searchTerm) || 
          p.categoryId.toLowerCase().includes(searchTerm) ||
          p.brandId.toLowerCase().includes(searchTerm)
        );
      }
      
      return filteredProducts;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Product detail
  static async fetchProductById(productId) {
    try {
      // For demo, return mock data
      // In production, uncomment the following:
      // const response = await apiClient.get(`/products/${productId}`);
      // return response.data;
      
      const product = mockProducts.find(p => p.id === parseInt(productId, 10));
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      throw error;
    }
  }

  // Price range
  static async fetchPriceRange() {
    try {
      // For demo, return mock data
      // In production, uncomment the following:
      // const response = await apiClient.get('/price-range');
      // return response.data;
      
      return mockPriceRange;
    } catch (error) {
      console.error('Error fetching price range:', error);
      throw error;
    }
  }

  // Search
  static async searchProducts(query) {
    try {
      // For demo, return mock data
      // In production, uncomment the following:
      // const response = await apiClient.get('/search', { params: { q: query } });
      // return response.data;
      
      return this.fetchProducts({ search: query });
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  // Cart
  static async addToCart(productId, quantity = 1) {
    try {
      // For demo, uncomment in production:
      // const response = await apiClient.post('/cart', { productId, quantity });
      // return response.data;
      
      // For demo purposes, just return success
      return { success: true, message: 'Product added to cart' };
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  // Authentication
  static async login(email, password) {
    try {
      // For demo, uncomment in production:
      // const response = await apiClient.post('/auth/login', { email, password });
      // const { token, user } = response.data;
      // localStorage.setItem('authToken', token);
      // localStorage.setItem('user', JSON.stringify(user));
      // return user;
      
      // Mock login for demo
      if (email === 'demo@example.com' && password === 'password') {
        const mockUser = {
          id: 1,
          name: 'Demo User',
          email: 'demo@example.com',
          phone: '0123456789',
        };
        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        return mockUser;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static async register(userData) {
    try {
      // For demo, uncomment in production:
      // const response = await apiClient.post('/auth/register', userData);
      // return response.data;
      
      // Mock register for demo
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async logout() {
    // For demo, uncomment in production:
    // await apiClient.post('/auth/logout');
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return { success: true };
  }

  // User profile
  static async fetchUserProfile() {
    try {
      // For demo, uncomment in production:
      // const response = await apiClient.get('/user/profile');
      // return response.data;
      
      // Mock user profile for demo
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        throw new Error('User not authenticated');
      }
      return user;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  static async updateUserProfile(userData) {
    try {
      // For demo, uncomment in production:
      // const response = await apiClient.put('/user/profile', userData);
      // return response.data;
      
      // Mock update for demo
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
} 