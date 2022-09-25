import { createSlice } from "@reduxjs/toolkit";

const bagSlice = createSlice({
  name: "bag",
  initialState: [],
  reducers: {
    updateBag: (state, { payload: bag }) => bag,
  },
});

export const bagActions = bagSlice.actions;

export default bagSlice.reducer;
