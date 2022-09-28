import { configureStore } from "@reduxjs/toolkit";
import bagReducer from "./bagReducer";
import popupReducer from "./popupReducer";
import confirmationReducer from "./confirmationReducer";
import formReducer from "./formReducer";
import authReducer from "./authReducer";

const appStore = configureStore({
  reducer: {
    bagReducer,
    popupReducer,
    confirmationReducer,
    formReducer,
    authReducer,
  },
});

export default appStore;
