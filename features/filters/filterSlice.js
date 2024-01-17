import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  searchProduct: "",
  sortBy: "featured",
  priceRange: [0, 4000],
  freeShipping: true,
  inStock: true,
  category: "all",
  perPage: 5,
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchProduct: (state, action) => {
      state.searchProduct = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setFreeShipping: (state, action) => {
      state.freeShipping = action.payload;
    },
    setInStock: (state, action) => {
      state.inStock = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },

    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const {
  setSearchProduct,
  setSortBy,
  setPriceRange,
  setFreeShipping,
  resetFilters,
  setCategory,
  setInStock,
  setPerPage,
} = filterSlice.actions;

export default filterSlice.reducer;
