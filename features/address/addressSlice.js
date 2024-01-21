// addressSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserAddresses = createAsyncThunk(
  "addresses/fetchUserAddresses",
  async (userId) => {
    const response = await fetch(`/api/user/${userId}?field=savedAddresses`, {
      method: "GET",
      cache: "no-store",
      next: { revalidate: 20 },
    });
    return await response.json();
  }
);

const initialState = {
  addresses: [],
  selectedAddress: null,
  status: "idle",
  error: null,
};

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    selectAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAddresses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addresses = action.payload;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { selectAddress } = addressSlice.actions;

export const selectAddresses = (state) => state.addresses.addresses;
export const selectSelectedAddress = (state) => state.addresses.selectedAddress;
export const selectStatus = (state) => state.addresses.status;

export default addressSlice.reducer;
