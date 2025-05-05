import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  subtotal: 0,
  totalQuantity: 0,
  promotionsApplied: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
      
      // Tính lại tổng tiền và số lượng
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      
      // Tính lại tổng tiền và số lượng
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.id === productId);
      
      if (item) {
        item.quantity = quantity;
      }
      
      // Tính lại tổng tiền và số lượng
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.totalQuantity = 0;
      state.promotionsApplied = [];
    },
    applyPromotion: (state, action) => {
      state.promotionsApplied.push(action.payload);
      // Logic tính toán khuyến mãi sẽ được thêm sau
    },
    removePromotion: (state, action) => {
      const promotionId = action.payload;
      state.promotionsApplied = state.promotionsApplied.filter(promo => promo.id !== promotionId);
      // Tính lại giá sau khi xóa khuyến mãi
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  applyPromotion,
  removePromotion
} = cartSlice.actions;

export default cartSlice.reducer;