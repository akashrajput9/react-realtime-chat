// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: {
      data: [],
    },
  },
  reducers: {
    setUsers(state, action) {
      state.users.data = action.payload;
    },
    addUser(state,action){
      state.users.data.push(action.payload);
    }
  },
});

export const { setUsers, addUser } = usersSlice.actions;
export default usersSlice.reducer;
