import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "./categories/categoriesSlice.js";
import productsSlice from "./products/productsSlice.js";
import { apiSlice } from "./api/apiSlice.js";
import userSlice from "./user/userSlice.js";

// console.log(apiSlice);

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    products: productsSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userSlice,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
});

export default store;
