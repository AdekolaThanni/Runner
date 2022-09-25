import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: "",
  reducers: {
    showError: (_, { payload }) => {
      return payload;
    },
  },
});

export const errorActions = errorSlice.actions;

export default errorSlice.reducer;
