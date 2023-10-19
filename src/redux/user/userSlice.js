import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL } from "../../utils/constants.js";
import axios from "axios";

// Для authentification:
export const createUser = createAsyncThunk("users/getUsers", async (payload, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/users`, payload);
    return res.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

export const loginUser = createAsyncThunk("users/loginUser", async (payload, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, payload);
    const login = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${res.data.access_token}` },
    });
    return login.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

export const updateUser = createAsyncThunk("users/updateUser", async (payload, thunkAPI) => {
  try {
    const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
    return res.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    cart: [],
    isLoading: false,
    formType: "signup",
    showForm: false,
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

    toggleForm: (state, action) => {
      state.showForm = action.payload;
    },

    toggleFormType: (state, action) => {
      state.formType = action.payload;
    },
  },

  // Для authentification:
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const { addItemToCart, toggleForm, toggleFormType } = userSlice.actions;

export default userSlice.reducer;

// return item.id === action.payload.id ? { ...item, quantity: action.payload.quantity || item.quantity + 1 } : item;
