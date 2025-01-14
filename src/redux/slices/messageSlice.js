// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: {
      current_page:0,
      data: [],
      conversation_element: {},
    },
  },
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    addMessage(state,action){
      state.messages.data.unshift(action.payload);
    }
  },
});

export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
