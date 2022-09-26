import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    type: "idle",
    message: null,
  },
  reducers: {
    showPopup: (_, { payload }) => {
      return payload;
    },

    hidePopup: () => {
      return {
        type: "idle",
        message: null,
      };
    },
  },
});

export const popupActions = popupSlice.actions;

export default popupSlice.reducer;
