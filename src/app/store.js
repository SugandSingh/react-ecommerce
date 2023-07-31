import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from '../features/Products/ProductSlice';

export const store = configureStore({
  reducer: {
    product:ProductReducer
  },
});
