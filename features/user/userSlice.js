import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  setUserToLocalStorage,
} from "@/utils/util";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = {
        ...action.payload.user,
        token: action.payload.token,
        status: action.payload.status,
      };
      setUserToLocalStorage(user);
      state.user = user;
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
