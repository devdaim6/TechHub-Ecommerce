import {
  editQuantity,
  getCartFromLocalStorage,
  getUserFromLocalStorage,
  pushToCart,
  removeCartFromLocalStorage,
  removeFromCart,
  setCartToLocalStorage,
} from "@/utils/util";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  userId: getUserFromLocalStorage()?.id,
  shipping: 50,
  orderTotal: 0,
  pickupAtStore: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(defaultState),
  reducers: {
    addItem: (state, action) => {
      const { productId, quantity, price, productColor, name, imageUrl } =
        action.payload;
      const item = state.cartItems.find((i) => i.productId === productId);
      if (item) {
        if (item?.productColor !== productColor || item?.price != price) {
          toast.warning("This Product have a variant in Cart");
          return;
        }
        item.quantity += quantity;
      } else {
        state.cartItems.push({
          productId,
          quantity,
          userId: getUserFromLocalStorage()?.id,
          price,
          productColor,
          name,
          imageUrl,
        });
      }
      state.numItemsInCart += quantity;
      state.cartTotal += price * quantity;
      cartSlice.caseReducers.calculateTotals(state);
      pushToCart(productId, quantity).then(async (res) =>
        console.log(await res.json())
      );
    },
    clearCart: (state) => {
      removeCartFromLocalStorage(defaultState);
      return defaultState;
    },
    removeItem: (state, action) => {
      const { productId } = action.payload;
      const product = state.cartItems.find((i) => i.productId === productId);

      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== productId
      );
      state.numItemsInCart -= product.quantity;
      state.cartTotal -= product.price * product.quantity;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Item removed from cart");
      removeFromCart(productId).then(async (res) =>
        console.log(await res.json())
      );
    },
    editItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.productId === productId);
      state.numItemsInCart += quantity - item.quantity;
      state.cartTotal += item.price * (quantity - item.quantity);
      item.quantity = quantity;
      cartSlice.caseReducers.calculateTotals(state);
      editQuantity(productId, quantity).then(async (res) =>
        console.log(await res.json())
      );
    },
    setShipping: (state, action) => {
      const { shipping } = action.payload;
      state.shipping = shipping;
      cartSlice.caseReducers.calculateTotals(state);
    },
    setPickup: (state, action) => {
      const { pickupAtStore } = action.payload;
      state.pickupAtStore = pickupAtStore;
      cartSlice.caseReducers.calculateTotals(state);
    },
    calculateTotals: (state) => {
      state.orderTotal = state.cartTotal;

      if (state.orderTotal < 499.0) {
        if (state.pickupAtStore) {
          state.shipping = 0;
        } else {
          state.shipping = 50;
        }
        state.orderTotal += state.shipping;
      } else {
        state.shipping = 0;
      }

      setCartToLocalStorage(state);
    },
  },
});

export const {
  addItem,
  clearCart,
  setPickup,
  setShipping,
  removeItem,
  editItem,
} = cartSlice.actions;

export default cartSlice.reducer;
