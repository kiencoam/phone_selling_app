export const calculateDiscount = (price, promotion) => {
  if (!promotion) return price;

  switch (promotion.type) {
    case 'PERCENTAGE':
      return price * (1 - promotion.value / 100);
    case 'FIXED_AMOUNT':
      return Math.max(0, price - promotion.value);
    case 'BUNDLE':
      return price * (1 - promotion.bundleDiscount / 100);
    default:
      return price;
  }
};

export const isPromotionValid = (promotion) => {
  const now = new Date();
  const startDate = new Date(promotion.startDate);
  const endDate = new Date(promotion.endDate);
  
  return now >= startDate && now <= endDate;
};
