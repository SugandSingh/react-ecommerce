import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, singOut } from "./authAPI";
import { updateUser } from "../user/userAPI";

const initialState = {
  userLgoin: null,
  status: false,
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUserAsync",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  "auth/checkUserAsync",
  async (userData) => {
    const response = await checkUser(userData);
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  "auth/updateUserAsync",
  async (updateUsers) => {
    const response = await updateUser(updateUsers);
    return response.data;
  }
);
export const singOutAsync = createAsyncThunk(
  "auth/singOutAsync",
  async (userData) => {
    const response = await singOut(userData);
    return response.data;
  }
);
export const authSlice = createSlice({
  name: "auth ",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = false;
        state.userLgoin = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = false;
        state.userLgoin = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = true;
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = false;
        state.userLgoin = action.payload;
      })
      .addCase(singOutAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(singOutAsync.fulfilled, (state, action) => {
        state.status = false;
        state.userLgoin = null;
      });
  },
});

export default authSlice.reducer;
