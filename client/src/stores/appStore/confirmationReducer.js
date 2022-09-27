import { createSlice } from "@reduxjs/toolkit";

const confirmationSlice = createSlice({
  name: "confirmation",
  initialState: {
    question: null,
    execution: null,
  },
  reducers: {
    askConfirmation: (_, { payload }) => payload,
    responseGotten: () => ({ question: null, execution: null }),
  },
});

export const confirmationActions = confirmationSlice.actions;

export default confirmationSlice.reducer;
