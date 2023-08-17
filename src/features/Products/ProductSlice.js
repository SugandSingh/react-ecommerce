import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllBrand,
  fetchAllCategory,
  fetchAllProduct,
  fetchAllProductByFilters,
  fetchProductById,
} from "./ProductApi";

const initialState = {
  product: [],
  totalItem: 0,
  status: false,
  category: [],
  brand: [],
  selectProduct: null,
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
  async ({ filter, sort, pagination }) => {
    const response = await fetchAllProductByFilters(filter, sort, pagination);
    return response.data;
  }
);
export const fetchAllCategoryAsync = createAsyncThunk(
  "product/fetchAllCategoryAsync",
  async () => {
    const response = await fetchAllCategory();
    return response.data;
  }
);
export const fetchAllBrandAsync = createAsyncThunk(
  "product/fetchAllBrandAsync",
  async () => {
    const response = await fetchAllBrand();
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductByIdAsync",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);
export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = false;
        state.product = action.payload;
      })
      .addCase(fetchAllProductByFiltersAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchAllProductByFiltersAsync.fulfilled, (state, action) => {
        state.status = false;
        state.product = action.payload.products;
        state.totalItem = action.payload.totalItem;
      })
      .addCase(fetchAllBrandAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchAllBrandAsync.fulfilled, (state, action) => {
        state.status = false;
        state.brand = action.payload;
      })
      .addCase(fetchAllCategoryAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchAllCategoryAsync.fulfilled, (state, action) => {
        state.status = false;
        state.category = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = false;
        state.selectProduct = action.payload;
      });
  },
});


export const selectAllProduct = (state) => state.product.product;

export default ProductSlice.reducer;
