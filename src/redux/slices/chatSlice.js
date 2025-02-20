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
    },
    moveChatToTop(state, action) {
      const conversation_id = action.payload?.conversation_id;
      const chatIndex = state.chats.findIndex(chat => chat.id === conversation_id);
      if (chatIndex > -1) {
        const [chat] = state.chats.splice(chatIndex, 1);
        chat.last_message = action.payload;
        chat.unread_count += 1;
        state.chats.unshift(chat);
      }
    },
    setRead(state, action) {
      const chat = state.chats.find(chat => chat.id === action.payload);
      if (chat) {
        chat.unread_count = 0;
      }
    }
    

  },
});

export const { setChat, addChat, moveChatToTop, setRead } = chatSlice.actions;
export default chatSlice.reducer;
