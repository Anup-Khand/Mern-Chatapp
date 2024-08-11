// src/features/valueSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatId: {},
  IsOpen: true,
};

const ChatSlice = createSlice({
  name: "value",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.chatId = action.payload;
    },
    setOpen: (state, action) => {
      state.IsOpen = action.payload;
    },
  },
});

export const { setValue, setOpen } = ChatSlice.actions;
export default ChatSlice.reducer;
