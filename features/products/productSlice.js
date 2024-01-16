import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalPages: 0,
  currentPage: 0,
  length: 0,
  loading: false,
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.length = action.payload.length;
    },
    setProductsLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
  },
});

export const { setProducts, setProductsLoading } = productsSlice.actions;
export default productsSlice.reducer;
