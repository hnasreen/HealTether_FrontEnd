import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem("token") || null,
  user: null,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    setUser: (state, action) => {
      state.user = action.payload; 
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    }
  },
});

export const { loginSuccess, setUser, clearAuth  } = authSlice.actions;
export default authSlice.reducer;
