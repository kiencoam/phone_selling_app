import api from './api';

export const PromotionService = {
  getAllPromotions: async () => {
    const response = await api.get('/promotions');
    return response.data;
  },

  getPromotionById: async (id) => {
    const response = await api.get(`/promotions/${id}`);
    return response.data;
  },

  getActivePromotions: async () => {
    const response = await api.get('/promotions/active');
    return response.data;
  },

  getFlashSales: async () => {
    const response = await api.get('/promotions/flash-sales');
    return response.data;
  },

  applyPromoCode: async (code) => {
    const response = await api.post('/promotions/apply', { code });
    return response.data;
  }
};
