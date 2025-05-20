import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Dữ liệu mẫu sản phẩm
const mockProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 34990000,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max-black-titanium-pure-back-iphone-15-pro-max-black-titanium-pure-front-2up-screen-usen.png',
    description: 'Điện thoại iPhone 15 Pro Max mới nhất với công nghệ hàng đầu',
    category: 'Điện thoại',
    stock: 15
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    price: 31990000,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/2/s24-ultra_1__1.png',
    description: 'Flagship Android mạnh mẽ với camera chất lượng cao',
    category: 'Điện thoại',
    stock: 20
  },
  {
    id: 3,
    name: 'MacBook Pro 16 inch M3 Pro',
    price: 65990000,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-pro-16-inch-m3-pro-2023-gray.png',
    description: 'Laptop chuyên dụng cho đồ họa và công việc nặng',
    category: 'Laptop',
    stock: 8
  },
  {
    id: 4,
    name: 'iPad Pro M2 12.9 inch',
    price: 28990000,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-pro-13-select-wifi-spacegray-202210-02.jpg',
    description: 'Máy tính bảng chuyên nghiệp cho công việc sáng tạo',
    category: 'Máy tính bảng',
    stock: 12
  },
  {
    id: 5,
    name: 'Tai nghe Apple AirPods Pro 2',
    price: 5990000,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_170_1_1.png',
    description: 'Tai nghe true wireless chống ồn chủ động thế hệ mới',
    category: 'Phụ kiện',
    stock: 30
  },
  {
    id: 6,
    name: 'Apple Watch Series 9',
    price: 10990000,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-watch-series-9-gps-41mm_1.png',
    description: 'Đồng hồ thông minh cao cấp với nhiều tính năng sức khỏe',
    category: 'Đồng hồ thông minh',
    stock: 18
  }
];

// API URL
const API_URL = 'https://phone-selling-app-mw21.onrender.com';

// Thunk action để lấy danh sách sản phẩm từ API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Thử kết nối với API thực tế
      const response = await axios.get(`${API_URL}/api/v1/product/search`);
      return response.data.data.content;
    } catch (error) {
      console.error('API Error:', error);
      // Fallback về mock data nếu API không hoạt động
      return mockProducts;
    }
  }
);

// Thunk action để lấy sản phẩm theo danh mục
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      // Nếu không có categoryId, lấy tất cả sản phẩm
      if (!categoryId) {
        const response = await axios.get(`${API_URL}/api/v1/product/search`);
        return response.data.data.content;
      }
      
      // Lấy sản phẩm theo categoryId
      const response = await axios.get(`${API_URL}/api/v1/product/search?categoryId=${categoryId}`);
      return response.data.data.content;
    } catch (error) {
      console.error('API Error:', error);
      // Fallback về dữ liệu mẫu được lọc theo category
      if (categoryId) {
        // Giả lập lọc sản phẩm theo id của danh mục
        const filteredProducts = mockProducts.filter(product => {
          // Map giữa tên danh mục và id
          const categoryMap = {
            'Điện thoại': 2,
            'Laptop': 4,
            'Đồng hồ thông minh': 8,
            'Máy tính bảng': 9,
            'Phụ kiện': 11
          };
          
          return categoryMap[product.category] === categoryId;
        });
        
        return filteredProducts.length > 0 ? filteredProducts : mockProducts;
      }
      return mockProducts;
    }
  }
);

// Thunk action để lấy chi tiết sản phẩm từ API
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/product/${productId}`);
      return response.data.data;
    } catch (error) {
      console.error('API Error:', error);
      // Fallback về mock data nếu API không hoạt động
      const mockProductDetail = mockProducts.find(product => product.id === Number(productId));
      if (mockProductDetail) {
        return {
          ...mockProductDetail,
          code: `PROD-${mockProductDetail.id}`,
          description: `Chi tiết về sản phẩm ${mockProductDetail.name}. Đây là một sản phẩm chất lượng cao với nhiều tính năng ưu việt.`,
          productLine: {
            id: mockProductDetail.id,
            name: mockProductDetail.name,
            code: `LINE-${mockProductDetail.id}`,
            category: {
              id: 2,
              name: mockProductDetail.category
            },
            brand: {
              id: 1,
              name: 'Apple',
              imageId: ''
            }
          },
          promotions: [
            {
              id: 1,
              name: 'Giảm giá mùa hè',
              value: mockProductDetail.price * 0.1,
              startDate: new Date().toISOString(),
              endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
              categoryId: 2
            }
          ],
          attributes: [
            {
              id: 1,
              value: 'A15 Bionic',
              attribute: {
                id: 1,
                name: 'CPU',
                categoryId: 2
              }
            },
            {
              id: 2,
              value: '6GB',
              attribute: {
                id: 2,
                name: 'RAM',
                categoryId: 2
              }
            },
            {
              id: 3,
              value: '256GB',
              attribute: {
                id: 3,
                name: 'Bộ nhớ',
                categoryId: 2
              }
            },
            {
              id: 4,
              value: '6.1 inch, Super Retina XDR',
              attribute: {
                id: 4,
                name: 'Màn hình',
                categoryId: 2
              }
            }
          ]
        };
      }
      return rejectWithValue(error.response?.data?.message || 'Không thể lấy chi tiết sản phẩm');
    }
  }
);

const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  categories: [],
  featuredProducts: [],
  selectedCategory: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    setFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.selectedCategory = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Không thể lấy sản phẩm theo danh mục';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductError, setFeaturedProducts } = productSlice.actions;
export default productSlice.reducer;
