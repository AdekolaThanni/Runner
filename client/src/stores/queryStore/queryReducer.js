import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  brand: [],
  price: [],
  rating: [],
  sort: [],
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    addToFilters: (state, { payload: [filter, option] }) => {
      if (!state[filter].includes(option)) {
        if (["category", "brand"].includes(filter)) state[filter].push(option);
        else state[filter] = [option];
      }
    },
    removeFromFilters: (state, { payload: [filter, option] }) => {
      state[filter] = state[filter].filter((opt) => opt !== option);
    },
    clearFilter: (state, { payload: filter }) => {
      state[filter] = [];
    },
    clearQuery: () => {
      return initialState;
    },
  },
});

export const queryActions = querySlice.actions;

export default querySlice.reducer;
