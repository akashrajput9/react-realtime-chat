// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initState = {
  messages: {
    current_page:0,
    data: [],
    conversation_element: {},
  },
};
const messageSlice = createSlice({
  name: 'messages',
  initialState: initState,
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    addMessage(state,action){
      state.messages.data.unshift(action.payload);
    },
    deleteMessage(state,action){
      state.messages.data  = state.messages.data.filter((res) => {
        return res.id != action.payload
      })
    },
    resetMessage(state,action){
      state.messages.data = [];
      state.messages.conversation_element = {};
      state.messages.current_page = 0;
    }
  },
});

export const { setMessages, addMessage, deleteMessage, resetMessage } = messageSlice.actions;
export default messageSlice.reducer;
