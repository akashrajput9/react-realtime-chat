// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chats',
  initialState: {
    chats: [],
  },
  reducers: {
    setChat(state, action) {
      state.chats = action.payload;
    },
    addChat(state,action){
      state.chats.unshift(action.payload);
    }
  },
});

export const { setChat, addChat } = chatSlice.actions;
export default chatSlice.reducer;
