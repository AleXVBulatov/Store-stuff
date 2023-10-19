import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL } from "../../utils/constants.js";
import axios from "axios";

// export const getCategories = createAsyncThunk("categories/getCategories", async (_, thunkAPI) => {
//   try {
//     const res = await axios(`${BASE_URL}/categories`);
//     return res.data;
//   } catch (err) {
//     console.log(err);
//     return thunkAPI.rejectWithValue(err);
//   }
// });

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: [],
    cart: [],
    isLoading: false,
  },
  reducers: {
    addItemToCart: (state, action) => {
      let newCart = [...state.cart];
      const found = state.cart.find((item) => item.id === action.payload.id);

      if (found) {
        newCart = newCart.map((item) => {
          return item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item;
        });
      } else {
        newCart.push({ ...action.payload, quantity: 1 });
      }

      state.cart = newCart;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getCategories.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getCategories.fulfilled, (state, action) => {
    //   state.list = action.payload;
    //   state.isLoading = false;
    // });
    // builder.addCase(getCategories.rejected, (state) => {
    //   state.isLoading = false;
    //   console.log("ОТКЛОНЕНО");
    // });
  },
});

export const { addItemToCart } = userSlice.actions;

export default userSlice.reducer;

// return item.id === action.payload.id ? { ...item, quantity: action.payload.quantity || item.quantity + 1 } : item;
