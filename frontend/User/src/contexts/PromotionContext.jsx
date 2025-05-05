import React, { createContext, useState, useContext, useEffect } from 'react';
import { PromotionService } from '../services/promotion.service';

const PromotionContext = createContext();

export const PromotionProvider = ({ children }) => {
  const [activePromotions, setActivePromotions] = useState([]);
  const [flashSales, setFlashSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivePromotions();
  }, []);

  const fetchActivePromotions = async () => {
    try {
      const [promotions, flashSaleData] = await Promise.all([
        PromotionService.getActivePromotions(),
        PromotionService.getFlashSales()
      ]);
      setActivePromotions(promotions);
      setFlashSales(flashSaleData);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PromotionContext.Provider 
      value={{ 
        activePromotions, 
        flashSales, 
        loading,
        fetchActivePromotions 
      }}
    >
      {children}
    </PromotionContext.Provider>
  );
};

export const usePromotion = () => useContext(PromotionContext);