import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/Products/ProductSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/CartSlice";
import ordereReducer from "../features/order/orderSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    auth: authReducer,
    cart: cartReducer,
    order: ordereReducer,
    user: userReducer,
  },
});
