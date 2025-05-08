import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
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