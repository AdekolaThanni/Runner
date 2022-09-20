import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "./queryReducer";

const queryStore = configureStore({
  reducer: queryReducer,
});

export default queryStore;
