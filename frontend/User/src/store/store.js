import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import wishlistReducer from './slices/wishlistSlice';
import promotionReducer from './slices/promotionSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productsReducer,
    wishlist: wishlistReducer,
    promotion: promotionReducer,
  },
});