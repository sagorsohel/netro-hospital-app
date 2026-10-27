import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: 'user-001',
    name: 'Sagor Sohel',
    email: 'sohel19sagor@gmail.com',
    phone: '+880 1700-000000',
    bloodGroup: 'B+',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  isAuthenticated: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { updateProfile, logout } = authSlice.actions;
export default authSlice.reducer;
