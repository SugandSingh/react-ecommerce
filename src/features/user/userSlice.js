import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUser, fetchLoggedInUserOrder } from "./userAPI";

const initialState = {
  userOrder: null,
  status: false,
  userInfo: null,
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrderAsync",
  async (userID) => {
    const response = await fetchLoggedInUserOrder(userID);
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUserAsync",
  async (userID) => {
    console.log("====================================");
    console.log("userID", userID);
    console.log("====================================");
    const response = await fetchLoggedInUser(userID);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = false;
        state.userOrder = action.payload;
      })

      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = false;
        state.userInfo = action.payload;
      });
  },
});
export const selectUserOrders = (state) => state?.user?.userOrder;

export default userSlice.reducer;
