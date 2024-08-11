// store.js
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
// import axios from "axios";
import { toast } from "react-toastify";
import { ApiClient } from "../utils/AxiosHandler";

const apiClient = ApiClient();

// Example async thunk
export const fetchSearchUser = createAsyncThunk(
  "search/fetchSearchUser",
  async (query) => {
    // const token = getState().auth.user;
    // console.log(token);
    try {
      const response = await apiClient.post("/api/auth/getsearchusers", {
        query: query,
      });
      console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const clearSearchResults = createAction("search/clearSearchResults");

const SearchUserSlice = createSlice({
  name: "searchuser",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSearchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(`Failed to fetch data: ${action.payload}`);
      })
      .addCase(clearSearchResults, (state) => {
        state.data = [];
        state.status = "idle";
        state.error = null;
      });
  },
});

export default SearchUserSlice.reducer;
