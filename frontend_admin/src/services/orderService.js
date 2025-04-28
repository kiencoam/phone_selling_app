import api from './api';

// Dịch vụ quản lý đơn hàng
export const orderService = {
  // Tìm kiếm đơn hàng với phân trang và bộ lọc
  searchOrders: async (params = {}) => {
    try {
      console.log('[ORDER SERVICE] Đang tìm kiếm đơn hàng với params:', params);
      const config = Object.keys(params).length > 0 ? { params } : {};
      const response = await api.get('/api/v1/order/staff/search', config);
      console.log('[ORDER SERVICE] Kết quả tìm kiếm đơn hàng:', response.data);
      return response.data;
    } catch (error) {
      console.error('[ORDER SERVICE] Lỗi khi tìm kiếm đơn hàng:', error);
      throw error;
    }
  },

  // Lấy thông tin chi tiết đơn hàng theo ID
  getOrderById: async (id) => {
    try {
      console.log('[ORDER SERVICE] Đang lấy thông tin chi tiết đơn hàng có ID:', id);
      const response = await api.get(`/api/v1/order/staff/${id}`);
      console.log('[ORDER SERVICE] Đã lấy thông tin chi tiết đơn hàng:', response.data);
      return response.data;
    } catch (error) {
      console.error('[ORDER SERVICE] Lỗi khi lấy thông tin chi tiết đơn hàng:', error);
      throw error;
    }
  }
};

export default orderService; 