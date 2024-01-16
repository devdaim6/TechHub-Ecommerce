import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  searchProduct: "",
  sortBy: "featured",
  priceRange: [0, 4000],
  freeShipping: true,
  inStock: true,
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
  setInStock,
} = filterSlice.actions;

export default filterSlice.reducer;
