/**
 * CartUtils - Cung cấp các hàm tiện ích cho việc xử lý giỏ hàng
 * Tách riêng khỏi CartContext để giảm kích thước và dễ bảo trì
 */
import logger from './logger';

/**
 * Tính tổng tiền của giỏ hàng
 * @param {Array} items - Các sản phẩm trong giỏ hàng
 * @returns {number} Tổng tiền
 */
export const calculateTotalPrice = (items) => {
  if (!items || !Array.isArray(items)) {
    logger.cart.warn('Invalid cart items passed to calculateTotalPrice', { items });
    return 0;
  }
  
  logger.cart.debug('Calculating total price', { itemCount: items.length });
  
  return items.reduce((total, item) => {
    const price = item.discountPrice || item.price;
    return total + price * item.quantity;
  }, 0);
};

/**
 * Tính tổng số lượng sản phẩm trong giỏ hàng
 * @param {Array} items - Các sản phẩm trong giỏ hàng
 * @returns {number} Tổng số lượng
 */
export const calculateItemCount = (items) => {
  if (!items || !Array.isArray(items)) {
    logger.cart.warn('Invalid cart items passed to calculateItemCount', { items });
    return 0;
  }
  
  logger.cart.debug('Calculating item count', { itemCount: items.length });
  
  return items.reduce((count, item) => count + item.quantity, 0);
};

/**
 * Kiểm tra một sản phẩm đã có trong giỏ hàng chưa
 * @param {Array} items - Các sản phẩm trong giỏ hàng
 * @param {number|string} productId - ID sản phẩm cần kiểm tra
 * @returns {boolean} True nếu sản phẩm đã có trong giỏ hàng
 */
export const isProductInCart = (items, productId) => {
  if (!items || !Array.isArray(items)) {
    logger.cart.warn('Invalid cart items passed to isProductInCart', { items });
    return false;
  }
  
  const exists = items.some(item => String(item.id) === String(productId));
  logger.cart.debug('Checking if product is in cart', { productId, exists });
  
  return exists;
};

/**
 * Lấy số lượng của một sản phẩm trong giỏ hàng
 * @param {Array} items - Các sản phẩm trong giỏ hàng
 * @param {number|string} productId - ID sản phẩm
 * @returns {number} Số lượng sản phẩm, 0 nếu không có trong giỏ hàng
 */
export const getItemQuantity = (items, productId) => {
  if (!items || !Array.isArray(items)) {
    logger.cart.warn('Invalid cart items passed to getItemQuantity', { items });
    return 0;
  }
  
  const item = items.find(i => String(i.id) === String(productId));
  const quantity = item ? item.quantity : 0;
  
  logger.cart.debug('Getting item quantity', { productId, quantity });
  return quantity;
};

/**
 * Tính tiền giảm giá
 * @param {Array} items - Các sản phẩm trong giỏ hàng
 * @returns {number} Tổng tiền giảm giá
 */
export const calculateDiscountAmount = (items) => {
  if (!items || !Array.isArray(items)) {
    logger.cart.warn('Invalid cart items passed to calculateDiscountAmount', { items });
    return 0;
  }
  
  const discount = items.reduce((total, item) => {
    if (item.discountPrice && item.price) {
      return total + (item.price - item.discountPrice) * item.quantity;
    }
    return total;
  }, 0);
  
  logger.cart.debug('Calculating discount amount', { discount });
  return discount;
};

/**
 * Format giá tiền
 * @param {number} price - Giá cần format
 * @param {string} currency - Đơn vị tiền tệ (mặc định: 'VND')
 * @returns {string} Giá đã format
 */
export const formatPrice = (price, currency = 'VND') => {
  if (typeof price !== 'number') {
    logger.cart.warn('Invalid price passed to formatPrice', { price });
    return '0 VND';
  }
  
  try {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0
    });
    
    return formatter.format(price);
  } catch (error) {
    logger.cart.error('Error formatting price', error);
    return `${price.toLocaleString()} ${currency}`;
  }
};

/**
 * Lưu giỏ hàng vào localStorage
 * @param {Array} items - Các sản phẩm trong giỏ hàng
 * @returns {boolean} True nếu lưu thành công
 */
export const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(items));
    logger.cart.debug('Cart saved to localStorage', { itemCount: items.length });
    return true;
  } catch (error) {
    logger.cart.error('Error saving cart to localStorage', error);
    return false;
  }
};

/**
 * Lấy giỏ hàng từ localStorage
 * @returns {Array} Các sản phẩm trong giỏ hàng, [] nếu không có
 */
export const getCartFromStorage = () => {
  try {
    const items = localStorage.getItem('cartItems');
    const parsedItems = items ? JSON.parse(items) : [];
    logger.cart.debug('Cart loaded from localStorage', { itemCount: parsedItems.length });
    return parsedItems;
  } catch (error) {
    logger.cart.error('Error loading cart from localStorage', error);
    return [];
  }
};

export default {
  calculateTotalPrice,
  calculateItemCount,
  isProductInCart,
  getItemQuantity,
  calculateDiscountAmount,
  formatPrice,
  saveCartToStorage,
  getCartFromStorage
}; 