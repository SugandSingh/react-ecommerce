import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProduct, fetchAllProductByFilters } from "./ProductApi";

const initialState = {
  product: [],
};

export const fetchAllProductAsync = createAsyncThunk(
  "product/fetchAllProductAsync",
  async () => {
    const response = await fetchAllProduct();
    return response.data;
  }
);
export const fetchAllProductByFiltersAsync = createAsyncThunk(
  "product/fetchAllProductByFiltersAsync",
  async (filter) => {
    const response = await fetchAllProductByFilters(filter);
    return response.data;
  }
);

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.product = action.payload;
      })
      .addCase(fetchAllProductByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.product = action.payload;
      });
  },
});

export const { increment } = ProductSlice.actions;

export const selectAllProduct = (state) => state.product.product;

export default ProductSlice.reducer;
