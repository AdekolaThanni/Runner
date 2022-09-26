import { configureStore } from "@reduxjs/toolkit";
import bagReducer from "./bagReducer";
import popupReducer from "./popupReducer";

const appStore = configureStore({
  reducer: { bagReducer, popupReducer },
});

export default appStore;
