import { configureStore } from "@reduxjs/toolkit";
import bagReducer from "./bagReducer";
import errorReducer from "./errorReducer";

const appStore = configureStore({
  reducer: { bagReducer, errorReducer },
});

export default appStore;
