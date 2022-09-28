import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    loggedIn: false,
  },
  reducers: {
    setLoggedInState: (_, { payload }) => payload,
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
