import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  refreshToken: null,
  email: "",
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.email = "";
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
