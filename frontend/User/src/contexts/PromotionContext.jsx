import React, { createContext, useState, useEffect } from 'react';
import { ApiService } from '../services/api.service';

export const PromotionContext = createContext();

export const PromotionProvider = ({ children }) => {
  const [promotions, setPromotions] = useState([]);
  const [activePromotions, setActivePromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch promotions on component mount
  useEffect(() => {
    const fetchPromotions = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from API
        // const data = await ApiService.fetchPromotions();
        
        // Mock data for demo
        const mockPromotions = [
          {
            id: 1,
            title: 'Giảm giá điện thoại hot',
            description: 'Giảm đến 2 triệu cho các dòng điện thoại cao cấp',
            startDate: '2023-07-01',
            endDate: '2023-08-31',
            type: 'direct_discount',
            bannerUrl: '/assets/images/promotions/phone-sale.jpg',
            conditions: {
              minPurchase: 0,
              categories: ['phone'],
              brands: ['samsung', 'xiaomi', 'oppo']
            },
            status: 'active'
          },
          {
            id: 2,
            title: 'Mua laptop tặng balo',
            description: 'Tặng balo cao cấp khi mua laptop từ 20 triệu',
            startDate: '2023-07-15',
            endDate: '2023-09-15',
            type: 'gift',
            bannerUrl: '/assets/images/promotions/laptop-gift.jpg',
            conditions: {
              minPurchase: 20000000,
              categories: ['laptop'],
              brands: []
            },
            status: 'active'
          },
          {
            id: 3,
            title: 'Ưu đãi sinh viên',
            description: 'Giảm 10% cho sinh viên khi mua sắm',
            startDate: '2023-08-01',
            endDate: '2023-10-31',
            type: 'percentage_discount',
            bannerUrl: '/assets/images/promotions/student-discount.jpg',
            conditions: {
              requiresVerification: true,
              discountPercentage: 10,
              maxDiscount: 1000000
            },
            status: 'active'
          },
          {
            id: 4,
            title: 'Flash Sale cuối tuần',
            description: 'Giảm sốc đến 50% chỉ trong 2 giờ mỗi tối cuối tuần',
            startDate: '2023-07-01',
            endDate: '2023-12-31',
            type: 'flash_sale',
            bannerUrl: '/assets/images/promotions/flash-sale.jpg',
            schedule: {
              days: [5, 6], // Friday and Saturday
              startTime: '20:00',
              endTime: '22:00'
            },
            status: 'active'
          }
        ];
        
        setPromotions(mockPromotions);
        
        // Filter active promotions
        const now = new Date();
        const active = mockPromotions.filter(promo => {
          const startDate = new Date(promo.startDate);
          const endDate = new Date(promo.endDate);
          return promo.status === 'active' && startDate <= now && endDate >= now;
        });
        
        setActivePromotions(active);
      } catch (err) {
        console.error('Error fetching promotions:', err);
        setError(err.message || 'Failed to load promotions');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPromotions();
  }, []);

  // Check if a product is eligible for promotion
  const getEligiblePromotions = (product) => {
    if (!product) return [];
    
    return activePromotions.filter(promo => {
      // Check category condition
      if (promo.conditions.categories && promo.conditions.categories.length > 0) {
        if (!promo.conditions.categories.includes(product.categoryId)) {
          return false;
        }
      }
      
      // Check brand condition
      if (promo.conditions.brands && promo.conditions.brands.length > 0) {
        if (!promo.conditions.brands.includes(product.brandId)) {
          return false;
        }
      }
      
      // Check minimum purchase value
      if (promo.conditions.minPurchase && product.price < promo.conditions.minPurchase) {
        return false;
      }
      
      return true;
    });
  };

  // Calculate discount for a product
  const calculateDiscount = (product, promotion) => {
    if (!product || !promotion) return 0;
    
    let discount = 0;
    
    switch (promotion.type) {
      case 'direct_discount':
        // Assuming direct discount value is stored in conditions.discountAmount
        discount = promotion.conditions.discountAmount || 0;
        break;
        
      case 'percentage_discount':
        const percentage = promotion.conditions.discountPercentage || 0;
        discount = (product.price * percentage) / 100;
        
        // Apply max discount cap if exists
        if (promotion.conditions.maxDiscount && discount > promotion.conditions.maxDiscount) {
          discount = promotion.conditions.maxDiscount;
        }
        break;
        
      // Other promotion types would be handled here
      
      default:
        discount = 0;
    }
    
    return discount;
  };

  // Get best applicable discount for a product
  const getBestDiscount = (product) => {
    if (!product) return { discount: 0, promotion: null };
    
    const eligiblePromotions = getEligiblePromotions(product);
    
    if (eligiblePromotions.length === 0) {
      return { discount: 0, promotion: null };
    }
    
    // Calculate discount for each eligible promotion
    const discounts = eligiblePromotions.map(promo => ({
      promotion: promo,
      discount: calculateDiscount(product, promo)
    }));
    
    // Find the promotion with the highest discount
    return discounts.reduce((best, current) => 
      current.discount > best.discount ? current : best
    , { discount: 0, promotion: null });
  };

  const value = {
    promotions,
    activePromotions,
    loading,
    error,
    getEligiblePromotions,
    calculateDiscount,
    getBestDiscount,
  };

  return <PromotionContext.Provider value={value}>{children}</PromotionContext.Provider>;
}; 