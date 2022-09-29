import { configureStore } from "@reduxjs/toolkit";
import bagReducer from "./bagReducer";
import popupReducer from "./popupReducer";
import confirmationReducer from "./confirmationReducer";
import formReducer from "./formReducer";
import authReducer from "./authReducer";
import wishlistReducer from "./wishlistReducer";
import queryReducer from "./queryReducer";

const appStore = configureStore({
  reducer: {
    bagReducer,
    popupReducer,
    confirmationReducer,
    formReducer,
    authReducer,
    wishlistReducer,
    queryReducer,
  },
});

export default appStore;
