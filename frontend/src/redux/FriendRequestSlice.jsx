import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiClient } from "../utils/AxiosHandler";
import { toast } from "react-toastify";

const apiClient = ApiClient();

export const GetFriendRequest = createAsyncThunk(
  "friendrequest/getfriendrequest",
  async () => {
    try {
      const response = await apiClient.get("/api/chat/getallfriendrequest");
      console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const AcceptFriendRequest = createAsyncThunk(
  "friendrequest/acceptfriendrequest",
  async (id, { dispatch }) => {
    try {
      const response = await apiClient.post("/api/chat/acceptfriendrequest", {
        senderId: id,
      });
      console.log(response?.data);
      dispatch(GetFriendRequest());
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const FriendsRequestSlice = createSlice({
  name: "friendrequest",
  initialState: {
    data: [],
    IsLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetFriendRequest.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(GetFriendRequest.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.data = action.payload;
      })
      .addCase(GetFriendRequest.rejected, (state, action) => {
        state.IsLoading = false;
        state.error = action.payload;
        toast.error(`Failed to fetch data: ${action.payload}`);
      });
  },
});
export default FriendsRequestSlice.reducer;
