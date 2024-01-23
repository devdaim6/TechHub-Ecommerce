"use client";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  setUserToLocalStorage,
} from "@/utils/util";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
const initialState = {
  user: getUserFromLocalStorage() || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = { ...action.payload, isLoggedIn: true };
      setUserToLocalStorage(action.payload);
    },
    logoutUser: (state) => {
      state.user = null;
      toast.success("Logged out successfully");
      removeUserFromLocalStorage();
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
