import api from './api';

const API_URL = 'https://phone-selling-app-mw21.onrender.com';

// Dịch vụ quản lý sản phẩm
export const productService = {
  // Lấy danh sách sản phẩm
  getProducts: async () => {
    try {
      console.log('[PRODUCT SERVICE] Đang lấy danh sách sản phẩm');
      const response = await api.get('/api/v1/product');
      console.log('[PRODUCT SERVICE] Đã lấy danh sách sản phẩm:', response.data);
      return response.data;
    } catch (error) {
      console.error('[PRODUCT SERVICE] Lỗi khi lấy danh sách sản phẩm:', error);
      throw error;
    }
  },

  // Lấy thông tin chi tiết sản phẩm theo ID
  getProductById: async (id) => {
    try {
      console.log('[PRODUCT SERVICE] Đang lấy thông tin sản phẩm có ID:', id);
      const response = await api.get(`/api/v1/product/${id}`);
      console.log('[PRODUCT SERVICE] Đã lấy thông tin sản phẩm:', response.data);
      return response.data;
    } catch (error) {
      console.error('[PRODUCT SERVICE] Lỗi khi lấy thông tin sản phẩm:', error);
      throw error;
    }
  },

  // Tạo sản phẩm mới
  createProduct: async (productData) => {
    try {
      console.log('[PRODUCT SERVICE] Đang tạo sản phẩm mới:', productData);
      const response = await api.post('/api/v1/product', productData);
      console.log('[PRODUCT SERVICE] Đã tạo sản phẩm mới:', response.data);
      return response.data;
    } catch (error) {
      console.error('[PRODUCT SERVICE] Lỗi khi tạo sản phẩm mới:', error);
      throw error;
    }
  },

  // Cập nhật thông tin sản phẩm
  updateProduct: async (productData) => {
    try {
      console.log('[PRODUCT SERVICE] Đang cập nhật sản phẩm:', productData);
      const response = await api.put('/api/v1/product', productData);
      console.log('[PRODUCT SERVICE] Đã cập nhật sản phẩm:', response.data);
      return response.data;
    } catch (error) {
      console.error('[PRODUCT SERVICE] Lỗi khi cập nhật sản phẩm:', error);
      throw error;
    }
  },

  // Xóa sản phẩm
  deleteProduct: async (id) => {
    try {
      console.log('[PRODUCT SERVICE] Đang xóa sản phẩm có ID:', id);
      const response = await api.delete(`/api/v1/product/${id}`);
      console.log('[PRODUCT SERVICE] Đã xóa sản phẩm:', response.data);
      return response.data;
    } catch (error) {
      console.error('[PRODUCT SERVICE] Lỗi khi xóa sản phẩm:', error);
      throw error;
    }
  },

  // Lấy danh sách sản phẩm của dòng sản phẩm theo ID
  getProductsByProductLineId: async (productLineId) => {
    try {
      console.log('[PRODUCT SERVICE] Đang lấy danh sách sản phẩm của dòng sản phẩm có ID:', productLineId);
      const response = await api.get(`/api/v1/product/product-line/${productLineId}`);
      console.log('[PRODUCT SERVICE] Đã lấy danh sách sản phẩm:', response.data);
      return response.data;
    } catch (error) {
      console.error('[PRODUCT SERVICE] Lỗi khi lấy danh sách sản phẩm:', error);
      throw error;
    }
  }
};

export default productService; 