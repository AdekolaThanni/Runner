import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    loggedIn: !!JSON.parse(localStorage.getItem("loggedIn")),
  },
  reducers: {
    setLoggedInState: (_, { payload }) => {
      localStorage.setItem("loggedIn", JSON.stringify(payload.loggedIn));
      return payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
