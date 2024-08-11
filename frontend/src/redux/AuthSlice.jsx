// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const toastOptions = {
  position: "top-right",
  autoClose: 5000,
  draggable: true,
  theme: "dark",
};
const URL = import.meta.env.VITE_PORT;
// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      //   const response = await axios.post("/api/login", credentials);
      //   // Store token in localStorage
      //   localStorage.setItem("token", response.data.token);
      //   return response.data;
      const details = await axios.post(`${URL}/api/auth/login`, formData);
      console.log(details);
      if (details?.data.status === false) {
        toast.error(details?.data.msg, toastOptions);
      }
      if (details?.data.user) {
        toast.success(
          `Welcome ${details?.data.user.firstname}${details?.data.user.lastname}`,
          toastOptions
        );
        localStorage.setItem("chat-app-user", JSON.stringify(details?.data));
        return details.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const fetchDataFromLocalStorage = () => {
  const storedData = JSON.parse(localStorage.getItem("chat-app-user"));
  // console.log(storedData?.user);
  return storedData ? storedData?.user : null;
};

// export default fetchDataFromLocalStorage;
const initialAuthenticationState = !!fetchDataFromLocalStorage();
console.log(initialAuthenticationState);
// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: fetchDataFromLocalStorage() || null,
    isAuthenticated: initialAuthenticationState,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("chat-app-user"); // Remove token from localStorage
    },
    loadUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        //   state.user = action.payload;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, loadUserFromToken } = authSlice.actions;
export default authSlice.reducer;
