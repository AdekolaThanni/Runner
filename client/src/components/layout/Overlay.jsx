import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

function Overlay({ children, hideOverlay }) {
  const overlayRef = useRef();

  useEffect(() => {
    overlayRef.current.addEventListener("click", (event) => {
      if (event.target.id === "overlayVisual") {
        return hideOverlay && hideOverlay();
      }
    });
  }, []);

  const variations = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return createPortal(
    <motion.div
      ref={overlayRef}
      variants={variations}
      initial="hidden"
      animate="visible"
      exit="exit"
      id="overlayVisual"
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center px-xs bg-[rgba(0,0,0,.3)] z-[10000]"
    >
      {children}
    </motion.div>,
    document.getElementById("overlay")
  );
}

export default Overlay;
