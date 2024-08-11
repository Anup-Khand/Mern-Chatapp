import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiClient } from "../utils/AxiosHandler";
import { toast } from "react-toastify";

const apiClient = ApiClient();

export const allUser = createAsyncThunk("friend/allUser", async () => {
  try {
    const response = await apiClient.get("/api/chat/alluserexpectfriend");
    console.log(response?.data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
});

export const SendRequest = createAsyncThunk(
  "friend/SendRequest",
  async (id, { dispatch }) => {
    console.log(id);
    try {
      const response = await apiClient.post("/api/chat/sendrequest", {
        receiverId: id,
      });
      console.log(response?.data);
      if (response?.data?.status == true) {
        dispatch(allUser());
      }
    } catch (error) {
      console.log(error);
    }
  }
);




const FriendsSlice = createSlice({
  name: "friend",
  initialState: {
    data: [],
    IsLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allUser.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(allUser.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.data = action.payload;
      })
      .addCase(allUser.rejected, (state, action) => {
        state.IsLoading = false;
        state.error = action.payload;
        toast.error(`Failed to fetch data: ${action.payload}`);
      });
  },
});
export default FriendsSlice.reducer;
