import React from "react";
import Overlay from "./Overlay";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { confirmationActions } from "../../stores/appStore/confirmationReducer";

function Confirmation() {
  const dispatch = useDispatch();
  const confirmation = useSelector((state) => state.confirmationReducer);

  return (
    <AnimatePresence>
      {confirmation.question && (
        <Overlay
          hideOverlay={() => dispatch(confirmationActions.responseGotten())}
        >
          <motion.div className="bg-white max-w-[40rem] text-center rounded-md text-[1.8rem]">
            <p className="p-md text-md border-b border-b-grayFaint text-center">
              {confirmation.question}
            </p>
            <div className="flex items-center justify-center gap-md py-md">
              <button
                onClick={() => {
                  confirmation.execution();
                  dispatch(confirmationActions.responseGotten());
                }}
                className="rounded-full w-[10rem] text-green-900 border-green-900 border-2"
              >
                Yes
              </button>
              <button
                onClick={() => dispatch(confirmationActions.responseGotten())}
                className="rounded-full w-[10rem] text-red-900 border-red-900 border-2"
              >
                No
              </button>
            </div>
          </motion.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

export default Confirmation;
