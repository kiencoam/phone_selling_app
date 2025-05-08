import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activePromotions: [],
  loading: false,
  error: null
};

const promotionSlice = createSlice({
  name: 'promotion',
  initialState,
  reducers: {
    setPromotionLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPromotions: (state, action) => {
      state.activePromotions = action.payload;
      state.loading = false;
    },
    setPromotionError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setPromotionLoading, setPromotions, setPromotionError } = promotionSlice.actions;
export default promotionSlice.reducer;
