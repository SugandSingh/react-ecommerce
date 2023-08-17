import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrder } from "./orderAPI";

const initialState = {
  order: [],
  currentOrder: null,
};

export const addOrderAsync = createAsyncThunk(
  "order/fetchCount",
  async (amount) => {
    const response = await addOrder(amount);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = false;
        state.order.push(action.payload)
        state.currentOrder = action.payload;
      });
  },
});
export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
