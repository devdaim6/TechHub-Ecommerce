import cartReducer from "@/features/cart/cartSlice";
import filterReducer from "@/features/filters/filterSlice";
import userReducer from "@/features/user/userSlice";
import productReducer from "@/features/products/productSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,
    filter: filterReducer,
    products: productReducer,
  },
});
