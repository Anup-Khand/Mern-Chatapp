import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiClient } from "../utils/AxiosHandler";
import { toast } from "react-toastify";

const apiClient = ApiClient();

export const fetchUserChat = createAsyncThunk(
  "user/fetchuserchat",
  async () => {
    try {
      const response = await apiClient.get("/api/chat/");
      console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const UserChatSlice = createSlice({
  name: "userchat",
  initialState: {
    data: [],
    IsLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserChat.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(fetchUserChat.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserChat.rejected, (state, action) => {
        state.IsLoading = false;
        state.error = action.payload;
        toast.error(`Failed to fetch data: ${action.payload}`);
      });
  },
});
export default UserChatSlice.reducer;
