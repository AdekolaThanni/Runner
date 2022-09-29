import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../../stores/appStore/popupReducer";
import Overlay from "../layout/Overlay";
import { AnimatePresence, motion } from "framer-motion";

function GlobalPopup() {
  const dispatch = useDispatch();
  const popup = useSelector((state) => state.popupReducer);

  const hidePopup = () => {
    dispatch(popupActions.hidePopup());
  };

  const variation = {
    hidden: {
      translateX: "35rem",
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      translateX: 0,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      translateX: "35rem",
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {popup.type !== "idle" && (
        <Overlay hideOverlay={hidePopup}>
          <motion.div
            onClick={hidePopup}
            variants={variation}
            className="absolute top-[8.2rem] right-0 flex bg-white rounded-l-lg overflow-hidden"
          >
            <div
              className={`${
                popup.type === "error" ? "bg-red-800" : "bg-green-900"
              } flex items-center justify-center p-sm cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 36 36"
                className="cursor-pointer w-[2.5rem] h-[2.5rem]"
              >
                <path
                  fill="white"
                  d="m19.41 18l8.29-8.29a1 1 0 0 0-1.41-1.41L18 16.59l-8.29-8.3a1 1 0 0 0-1.42 1.42l8.3 8.29l-8.3 8.29A1 1 0 1 0 9.7 27.7l8.3-8.29l8.29 8.29a1 1 0 0 0 1.41-1.41Z"
                  class="clr-i-outline clr-i-outline-path-1"
                />
                <path fill="none" d="M0 0h36v36H0z" />
              </svg>
            </div>
            <p className="px-md py-xs text-[1.7rem] pr-[5rem] font-medium w-[35rem] flex items-center">
              {popup.message}
            </p>
          </motion.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

export default GlobalPopup;
