import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

function reducer(state = initialState, action) {
  return state;
}

const store = configureStore({ reducer });

export default store;

// export const store = configureStore({
//   reducer: {
//     categories: "cat",
//   },

//   devTools: true,
// });
