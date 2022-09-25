import React from "react";
import { createPortal } from "react-dom";

function Overlay({ children }) {
  return createPortal(
    <div className="absolute w-screen h-screen flex items-center justify-center bg-[#000000] z-[10000]">
      {children}
    </div>,
    document.getElementById("overlay")
  );
}

export default Overlay;
