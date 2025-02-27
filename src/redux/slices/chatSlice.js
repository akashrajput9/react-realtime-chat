import { createSlice } from '@reduxjs/toolkit';

const moveChatToTopHelper = (state, chatData) => {
  const chatIndex = state.chats.findIndex(chat => chat.id === chatData.id);
  
  if (chatIndex > -1) {
    // If chat exists, update and move to top
    const [chat] = state.chats.splice(chatIndex, 1);
    chat.last_message = chatData.last_message;
    chat.unread_count += 1;
    state.chats.unshift(chat);
  } else {
    // If chat doesn't exist, add it
    state.chats.unshift(chatData);
  }
};

const chatSlice = createSlice({
  name: 'chats',
  initialState: {
    chats: [],
  },
  reducers: {
    setChat(state, action) {
      state.chats = action.payload;
    },
    addChat(state, action) {
      moveChatToTopHelper(state, action.payload);
    },
    moveChatToTop(state, action) {
      const chatData = {
        id: action.payload.conversation_id,
        last_message: action.payload,
      };
      moveChatToTopHelper(state, chatData);
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
