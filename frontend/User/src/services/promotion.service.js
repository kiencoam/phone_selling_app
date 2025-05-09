import { ApiService } from './api';

// Dữ liệu mẫu cho khuyến mãi
const mockActivePromotions = [
  {
    id: 1,
    title: 'Mừng Tết 2024',
    description: 'Giảm đến 30% cho tất cả sản phẩm',
    imageUrl: '/assets/images/promotions/tet-2024.jpg',
    startDate: '2024-01-20',
    endDate: '2024-02-20',
    discountPercent: 30,
    categoryId: 'all'
  },
  {
    id: 2,
    title: 'Back to School',
    description: 'Ưu đãi đặc biệt cho học sinh, sinh viên',
    imageUrl: '/assets/images/promotions/back-to-school.jpg',
    startDate: '2024-08-01',
    endDate: '2024-09-15',
    discountPercent: 20,
    categoryId: 'laptop'
  },
  {
    id: 3,
    title: 'Khuyến mãi iPhone',
    description: 'Giảm ngay 2 triệu khi mua iPhone 15 series',
    imageUrl: '/assets/images/promotions/iphone-promo.jpg',
    startDate: '2024-02-01',
    endDate: '2024-03-01',
    discountAmount: 2000000,
    categoryId: 'phone',
    brandId: 'apple'
  }
];

// Dữ liệu mẫu cho flash sale
const mockFlashSales = {
  id: 'flash-sale-2024-02',
  title: 'FLASH SALE THÁNG 2',
  endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 giờ từ bây giờ
  products: [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      originalPrice: 34990000,
      salePrice: 30990000,
      imageUrl: '/assets/images/products/iphone-15-pro-max.jpg',
      discount: 11,
      soldCount: 42,
      totalCount: 50
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      originalPrice: 31990000,
      salePrice: 28990000,
      imageUrl: '/assets/images/products/samsung-galaxy-s24.jpg',
      discount: 9,
      soldCount: 38,
      totalCount: 50
    },
    {
      id: 5,
      name: 'MacBook Pro 16 M3 Max',
      originalPrice: 85990000,
      salePrice: 78990000,
      imageUrl: '/assets/images/products/macbook-pro-16.jpg',
      discount: 8,
      soldCount: 25,
      totalCount: 30
    }
  ]
};

export const PromotionService = {
  getAllPromotions: async () => {
    try {
      // Trong môi trường thực tế, sẽ gọi API thật
      // const response = await ApiService.get('/promotions');
      // return response.data;
      
      // Trả về dữ liệu mẫu
      return mockActivePromotions;
    } catch (error) {
      console.error('Error fetching all promotions:', error);
      return [];
    }
  },

  getPromotionById: async (id) => {
    try {
      // Trong môi trường thực tế:
      // const response = await ApiService.get(`/promotions/${id}`);
      // return response.data;
      
      return mockActivePromotions.find(promo => promo.id === parseInt(id, 10)) || null;
    } catch (error) {
      console.error(`Error fetching promotion with id ${id}:`, error);
      return null;
    }
  },

  getActivePromotions: async () => {
    try {
      // Trong môi trường thực tế:
      // const response = await ApiService.get('/promotions/active');
      // return response.data;
      
      return mockActivePromotions;
    } catch (error) {
      console.error('Error fetching active promotions:', error);
      return [];
    }
  },

  getFlashSales: async () => {
    try {
      // Trong môi trường thực tế:
      // const response = await ApiService.get('/promotions/flash-sales');
      // return response.data;
      
      return mockFlashSales;
    } catch (error) {
      console.error('Error fetching flash sales:', error);
      return null;
    }
  },

  applyPromoCode: async (code) => {
    try {
      // Trong môi trường thực tế:
      // const response = await ApiService.post('/promotions/apply', { code });
      // return response.data;
      
      // Mô phỏng việc áp dụng mã khuyến mãi
      if (code === 'WELCOME10') {
        return {
          success: true,
          discount: 10,
          discountType: 'percent',
          message: 'Áp dụng mã giảm giá thành công'
        };
      } else if (code === 'FREESHIP') {
        return {
          success: true,
          discount: 0,
          discountType: 'shipping',
          message: 'Áp dụng mã miễn phí vận chuyển thành công'
        };
      } else {
        return {
          success: false,
          message: 'Mã khuyến mãi không hợp lệ hoặc đã hết hạn'
        };
      }
    } catch (error) {
      console.error('Error applying promo code:', error);
      return {
        success: false,
        message: 'Đã xảy ra lỗi khi áp dụng mã khuyến mãi'
      };
    }
  }
};
