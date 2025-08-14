import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./slices/productSlice";
import { orderApi } from "./slices/orderSlice";
import { galleryApi } from "./slices/gallerySlice";
import { adminApi } from "./slices/adminSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [galleryApi.reducerPath]: galleryApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      orderApi.middleware,
      galleryApi.middleware,
      adminApi.middleware
    ),
});
