import { configureStore } from "@reduxjs/toolkit";
import bagReducer from "./bagReducer";
import popupReducer from "./popupReducer";
import confirmationReducer from "./confirmationReducer";

const appStore = configureStore({
  reducer: { bagReducer, popupReducer, confirmationReducer },
});

export default appStore;
