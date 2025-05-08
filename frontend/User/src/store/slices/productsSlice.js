import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedProduct: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProducts: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    }
  }
});

export const { setLoading, setProducts, setError, setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
