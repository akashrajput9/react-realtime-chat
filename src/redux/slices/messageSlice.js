// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: {
      current_page:0,
      data: [],
    },
  },
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    }
  },
});

export const { setMessages } = messageSlice.actions;
export default messageSlice.reducer;
