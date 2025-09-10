import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/books";

export const fetchBooks = createAsyncThunk(
  "/books/fetchBooks",
  async ({ page = 1, limit = 10 } = {}, { getState, rejectWithValue }) => {
    try {
      const { filters } = getState().books;

      const res = await axios.get(API_URL, {
        params: { page, limit, ...filters },
      });

      console.log("data from fetchBooks", res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const addBook = createAsyncThunk(
  "/books/addBook",
  async (book, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, book);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateBook = createAsyncThunk(
  "/books/updateBook",
  async ({ updatedBook }, { rejectWithValue }) => {
    try {
      console.log(updatedBook);
      const res = await axios.put(`${API_URL}`, updatedBook);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "/books/deleteBook",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
const initialState = {
  books: [],
  total: 0,
  page: 1,
  limit: 10,
  filters: { search: "", genre: "all", status: "all" },
  loading: false,
  error: null,
}

const booksSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
  
        state.books = action.payload.data || action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

     
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.total += 1;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

    
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) state.books[index] = action.payload;
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((b) => b.id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setFilters } = booksSlice.actions;
export default booksSlice.reducer;
