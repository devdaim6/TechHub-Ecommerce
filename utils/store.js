import cartReducer from "@/features/cart/cartSlice";
import filterReducer from "@/features/filters/filterSlice";
import userReducer from "@/features/user/userSlice";
import productReducer from "@/features/products/productSlice";
import singleProductReducer from "@/features/products/singleProduct/singleProductSlice";
import reviewsReducer from "@/features/reviews/reviewsSlice";
import addressReducer from "@/features/address/addressSlice";
import dateRangeReducer from "@/features/date/dateSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,
    filter: filterReducer,
    products: productReducer,
    singleProduct: singleProductReducer,
    reviews: reviewsReducer,
    addresses: addressReducer,
    dateRange: dateRangeReducer,
  },
});
