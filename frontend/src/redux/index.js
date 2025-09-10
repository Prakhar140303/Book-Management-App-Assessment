import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./bookSlice.js";

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export default store;
