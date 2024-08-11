import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiClient } from "../utils/AxiosHandler";
import { toast } from "react-toastify";

const apiClient = ApiClient();

export const sendMessage = createAsyncThunk(
  "message/sendmessage",
  async ({ newMessage, ChatId }) => {
    console.log(newMessage, ChatId);
    try {
      const response = await apiClient.post("/api/message/", {
        text: newMessage,
        chatId: ChatId,
      });
      console.log(response?.data);
      return response?.data
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchMessage = createAsyncThunk(
  "message/fetchmessage",
  async (chatId) => {
    console.log(chatId);
    try {
      const response = await apiClient.get(`/api/message/${chatId}`);
      console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const MessageSlice = createSlice({
  name: "message",
  initialState: {
    data: [],
    messages: [],
    IsLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.data = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.IsLoading = false;
        state.error = action.payload;
        toast.error(`Failed to fetch data: ${action.payload}`);
      })
      .addCase(fetchMessage.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.messages = action.payload;
      });
  },
});
export default MessageSlice.reducer;
