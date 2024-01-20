import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productColor: "",
  quantity: 1,
  size: null,
  price: null,
};

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    setProductColor: (state, action) => {
      state.productColor = action.payload;
    },

    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setProductSize: (state, action) => {
      state.size = action.payload;
    },
    resetSingleProduct: (state) => {
      state.productColor = "";
      state.quantity = 1;
    },
  },
});

export const {
  setProductColor,
  setPrice,
  setProductSize,
  setQuantity,
  resetSingleProduct,
} = singleProductSlice.actions;
export default singleProductSlice.reducer;
