import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    type: null,
  },
  reducers: {
    showForm: (_, { payload }) => payload,
    hideForm: () => ({ type: null }),
  },
});

export const formActions = formSlice.actions;

export default formSlice.reducer;
