import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Overlay from "../layout/Overlay";

function GlobalErrorPopup() {
  const error = useSelector((state) => state.errorReducer);

  const errorContent = <Overlay>Hello</Overlay>;

  return error && errorContent;
}

export default GlobalErrorPopup;
