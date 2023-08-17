import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCart,
  deleteCartItem,
  fetchItemById,
  resetCart,
  updateCart,
} from "./CartAPI";

const initialState = {
  item: [],
  status: false,
};

export const addCartAsync = createAsyncThunk(
  "cart/addCartAsync",
  async (item) => {
    const response = await addCart(item);
    return response.data;
  }
);

export const fetchItemByIdAsync = createAsyncThunk(
  "cart/fetchItemByIdAsync",
  async (userId) => {
    const response = await fetchItemById(userId);
    return response.data;
  }
);
export const updateCartAsync = createAsyncThunk(
  "cart/updateCartAsync",
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);
export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteCartItemAsync",
  async (itemId) => {
    const response = await deleteCartItem(itemId);
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk(
  "cart/resetCartAsync",
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCartAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(addCartAsync.fulfilled, (state, action) => {
        state.status = false;
        state.item.push(action.payload);
      })
      .addCase(fetchItemByIdAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchItemByIdAsync.fulfilled, (state, action) => {
        state.status = false;
        state.item = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = false;
        const index = state.item.findIndex(
          (item) => item.id === action.payload.id
        );
        state.item[index] = action.payload;
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = false;
        const index = state.item.findIndex(
          (item) => item.id === action.payload.id
        );
        state.item.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = false;
        state.item = [];
      });
  },
});
export default cartSlice.reducer;
