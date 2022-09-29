import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    updateWishlist: (_, { payload }) => payload,
  },
});

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice.reducer;
