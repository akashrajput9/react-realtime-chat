// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = null;
      state.user = {};
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
