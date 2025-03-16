import { createSlice } from '@reduxjs/toolkit';

const moveChatToTopHelper = (state, chatData, incrementUnread = true) => {
  const chatIndex = state.chats.findIndex(chat => chat.id === chatData.id);
  
  if (chatIndex > -1) {
    // If chat exists, update and move to top
    const [chat] = state.chats.splice(chatIndex, 1);
    chat.last_message = chatData.last_message;
    if (incrementUnread) {
      chat.unread_count += 1;
    }
    state.chats.unshift(chat);
  } else {
    // If chat doesn't exist, add it
    state.chats.unshift(chatData);
  }
};

const initState = {
  chats: [],
};

const chatSlice = createSlice({
  name: 'chats',
  initialState: initState,
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
    },
    chatReset(state, action) {
      state.chats = [];
    },
    handleNewMessage(state, action) {
      const chatData = {
        id: action.payload.conversation.id,
        last_message: {
          id: action.payload.id,
          conversation_id: action.payload.conversation_id,
          user_id: action.payload.user_id,
          content: action.payload.content,
          created_at: action.payload.created_at,
        },
      };
      moveChatToTopHelper(state, chatData, true);
    },
    handleSendMessage(state, action) {
      const chatData = {
        id: action.payload.conversation.id,
        last_message: {
          id: action.payload.id,
          conversation_id: action.payload.conversation_id,
          user_id: action.payload.user_id,
          content: action.payload.content,
          created_at: action.payload.created_at,
        },
      };
      moveChatToTopHelper(state, chatData, false);
    }
  },
});

export const { setChat, addChat, moveChatToTop, setRead, chatReset, handleNewMessage, handleSendMessage } = chatSlice.actions;
export default chatSlice.reducer;
